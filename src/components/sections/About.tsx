"use client";

import { useEffect, useState, useRef } from "react";
import { useScroll } from "framer-motion";
import AboutTextFade from "../TextFade";

export default function About() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const firstText = "We combine the deep roots of Persian aesthetics with cutting-edge Full-stack Technology. Infinity is in our DNA.";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="about" className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-24 overflow-hidden pt-[10vh]">
        <div className="max-w-6xl w-full">
          <div className="mb-12 opacity-25">
            <span className="text-[#00a693] font-sans text-[10px] tracking-[2em] uppercase block">
              01 / About
            </span>
          </div>
          {isMounted && <AboutTextFade value={firstText} progress={scrollYProgress} />}
        </div>
      </div>
    </section>
  );
}