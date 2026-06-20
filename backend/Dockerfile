# استفاده از نسخه سبک و بهینه پایتون
FROM python:3.11-slim

# تنظیم پوشه کاری درون کانتینر
WORKDIR /app

# جلوگیری از نوشتن فایل‌های .pyc روی دیسک کانتینر
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# نصب ابزارهای مورد نیاز برای کامپایل برخی پکیج‌ها (مثل psycopg2 یا greenlet در صورت نیاز)
RUN apt-get update && apt-get install -y --no-install-recommends gcc python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# کپی و نصب نیازمندی‌ها
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# کپی کردن کل کدهای بک‌اند به کانتینر
COPY . .

# باز کردن پورت ۸۰۰۰
EXPOSE 8000

# دستور اجرای سرور FastAPI با Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]