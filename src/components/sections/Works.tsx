"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const projects = [
  { id: 1, title: "Nfinite Art", category: "Web Design", color: "#a21441", image: "/works/nfinite-art.png" },
  { id: 2, title: "Cyber Core", category: "Full-stack", color: "#a21441", image: "/works/cyber-core.png" },
  { id: 3, title: "Persian Grid", category: "UI/UX", color: "#a21441", image: "/works/persian-grid.png" },
  { id: 4, title: "Nsale", category: "eCommerce", color: "#a21441", image: "/works/nsale.png" },
];

export default function Works() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.85], ["0%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <section id="works" ref={targetRef} className="relative h-auto md:h-[400vh] bg-transparent">
      <div className="relative md:sticky top-0 flex h-auto md:h-screen flex-col md:flex-row items-center overflow-visible md:overflow-hidden py-20 md:py-0">
        
        <motion.div 
          style={isMobile ? {} : { x, opacity }} 
          className="flex flex-col md:flex-row gap-10 md:gap-12 px-6 md:px-32 w-full md:w-auto items-center md:items-stretch"
        >
          <div className="flex flex-col justify-center w-full md:min-w-[500px] text-center md:text-left mb-6 md:mb-0">
            <span className="text-[#701c1c] font-sans text-xs tracking-[1em] uppercase mb-4 md:mb-6 block">
              02 / Works
            </span>
            <h2 className="text-5xl md:text-8xl font-display uppercase leading-[0.9] md:leading-[0.85] tracking-tighter text-white">
              Selected<br className="hidden md:block"/> Projects
            </h2>
            <p className="mt-4 md:mt-8 text-white/30 font-sans text-sm uppercase tracking-widest">
              Shift the perspective.
            </p>
          </div>

          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-[50vh] md:h-[65vh] w-full max-w-[400px] md:w-[500px] bg-[#0c0c0c] border border-white/10 flex-shrink-0 flex flex-col justify-end overflow-hidden hover:border-[#a21441]/50 transition-colors duration-500 rounded-xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top filter grayscale-[30%] brightness-[0.35] group-hover:brightness-[0.55] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                priority={project.id <= 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#a21441]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              
              <div className="relative z-20 p-6 md:p-12">
                <p className="text-[#701c1c] font-sans text-[10px] tracking-[0.2em] uppercase mb-2 md:mb-3 opacity-80">
                  {project.category}
                </p>
                <h3 className="text-3xl md:text-6xl font-display uppercase tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-2 text-white">
                  {project.title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] bg-[#701c1c] w-0 group-hover:w-full transition-all duration-500 shadow-[0_0_15px_#a21441] z-30" />
            </div>
          ))}
          <div className="hidden md:block min-w-[20vw]" />
        </motion.div>
      </div>
    </section>
  );
}