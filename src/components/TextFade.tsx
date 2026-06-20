"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface TextFadeProps {
  value: string;
  progress: MotionValue<number>;
}

export default function AboutTextFade({ value, progress }: TextFadeProps) {
  const words = value.split(" ");

  return (
    <p className="flex flex-wrap text-2xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight gap-x-3 gap-y-4 leading-tight justify-start items-center">
      {words.map((word, i) => {
        
        const start = i / words.length;
        const end = (i + 1) / words.length;
        
        return (
          <Word key={i} progress={progress} start={start} end={end}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

function Word({ children, progress, start, end }: WordProps) {
  // پاکسازی کلمات از علائم نگارشی مثل نقطه برای بررسی دقیق کلمات کلیدی
  const cleanWord = children.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toUpperCase();
  const isSpecialWord = cleanWord === "PERSIAN" || cleanWord === "TECHNOLOGY" || cleanWord === "DNA";

  /* 🎯 شاه‌کلید حل باگ: 
    یک آرایه ۴ نقطه‌ای تعریف می‌کنیم. 
    از اسکرول 0 تا نقطه شروع کلمه (start)، نور کلمه روی حداقل (0.15) می‌ماند.
    بین start و end کلمه به اوج روشنایی (1) می‌رسد.
    و از نقطه end تا انتهای کل اسکرول (یعنی عدد 1)، روشنایی روی همان 1 قفل می‌ماند و دیگر خاموش نمی‌شود.
  */
  const opacity = useTransform(
    progress, 
    [0, start, end, 1], 
    [0.15, 0.15, 1, 1]
  );

  return (
    <span className="relative inline-block">
      <motion.span 
        style={{ opacity }} 
        className={isSpecialWord ? "text-[#00a693]" : "text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
}