"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Technologies", href: "#technologies" },
    { name: "Works", href: "#works" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-8 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
      >
        {/* لوگو */}
        <a 
          href="#hero"
          onClick={(e) => {
            scrollToSection(e, "#hero");
            setIsOpen(false);
          }}
          className="text-xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer inline-block text-white z-[110]"
        >
          INFINITY<span className="text-[#701c1c]">™</span>
        </a>
        
        {/* منوی دسکتاپ: در موبایل پنهان می‌شود */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#701c1c] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* دکمه منوی موبایل: فقط در موبایل و تبلت ظاهر می‌شود */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors z-[110] focus:outline-none"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </motion.nav>

      {/* اوورلی منوی موبایل با انیمیشن بلور لوکس */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col justify-center items-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  scrollToSection(e, item.href);
                  setIsOpen(false);
                }}
                className="text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}