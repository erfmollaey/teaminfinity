import type { Config } from "tailwindcss";

const config: Config = {
  content: [
   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // پالت رنگی اختصاصی Team Infinity
        infinity: {
          blue: "#1c39bb",    // سرمه‌ای اصلی
          red: "#701c1c",     // جگری/قرمز تیره
          gold: "#ebb40f",    // طلایی ایرانی
          magenta: "#a21441", // ارغوانی
          teal: "#00a693",    // فیروزه‌ای
          bg: "#050505",      // مشکی عمیق برای پس‌زمینه
          card: "#0f0f12",    // رنگ کارت‌ها در تم دارک
        },
      },
      // می‌تونی فونت‌های انگلیسی مدرن رو هم اینجا تنظیم کنی
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      // انیمیشن‌های اضافه اگر نیاز داشتی
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;

