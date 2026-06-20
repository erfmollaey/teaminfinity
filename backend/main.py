import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

# ایمپورت‌های مربوط به SQLAlchemy
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String, Text, DateTime

# ایمپورت‌های مربوط به سیستم Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# بارگذاری متغیرهای محیطی
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# ۱. راه‌اندازی سیستم محدودکننده بر اساس IP کاربر
limiter = Limiter(key_func=get_remote_address)

# ۲. پیکربندی دیتابیس آسنکرون
engine = create_async_engine(DATABASE_URL, echo=False, future=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# ۳. مدیریت چرخه حیات (بدون create_all لایه سنتی، چون المبیک جایش را گرفته)
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()

app = FastAPI(title="Infinity Portfolio Backend", version="1.2.0", lifespan=lifespan)

# متصل کردن سیستم Rate Limiter و مدیریت خطای آن به FastAPI
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# تنظیمات CORS
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# ۴. تزریق وابستگی دیتابیس آسنکرون به صورت Clean
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_contact_email(data: ContactRequest):
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    if not all([smtp_server, smtp_user, smtp_password, receiver_email]):
        print("SMTP configuration is incomplete. Skipping email broadcast.")
        return

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = receiver_email
    msg["Subject"] = f"💼 New Portfolio Message from {data.name}"

    body = f"You have received a new message from your portfolio:\n\nName: {data.name}\nEmail: {data.email}\n\nMessage:\n{data.message}"
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, receiver_email, msg.as_string())
    except Exception as e:
        print(f"Failed to send email: {str(e)}")


# ۵. اندپوینت نهایی و امن فرم تماس
@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def handle_contact_form(
    request: Request, 
    payload: ContactRequest, 
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    try:
        db_message = ContactMessage(
            name=payload.name,
            email=payload.email,
            message=payload.message
        )
        db.add(db_message)
        
        # کامیت آسنکرون درون بلوک تری برای گرفتن خطاهای احتمالی دیتابیس
        await db.commit()
        
        # اجرای تسک پس‌زمینه ارسال ایمیل
        background_tasks.add_task(send_contact_email, payload)
        
        return {
            "success": True,
            "message": "Message saved and notification sent successfully."
        }
    except Exception as e:
        # رول‌بک در صورت بروز خطا در فرآیند دیتابیس
        await db.rollback()
        print(f"Database operation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message."
        )