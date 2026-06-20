"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  { id: 1, title: "Nfinite Art", category: "Web Design", color: "#a21441", image: "/works/nfinite-art.png" },
  { id: 2, title: "Cyber Core", category: "Full-stack", color: "#a21441", image: "/works/cyber-core.png" },
  { id: 3, title: "Persian Grid", category: "UI/UX", color: "#a21441", image: "/works/persian-grid.png" },
  { id: 4, title: "Nsale", category: "eCommerce", color: "#a21441", image: "/works/nsale.png" },
];

export default function Works() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.85], ["0%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <section id="works" ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x, opacity }} className="flex gap-12 px-10 md:px-32">
          <div className="flex flex-col justify-center min-w-[350px] md:min-w-[500px]">
            <span className="text-[#701c1c] font-sans text-xs tracking-[1em] uppercase mb-6 block">
              02 / Works
            </span>
            <h2 className="text-6xl md:text-8xl font-display uppercase leading-[0.85] tracking-tighter">
              Selected<br/>Projects
            </h2>
            <p className="mt-8 text-white/30 font-sans text-sm uppercase tracking-widest">
              Shift the perspective.
            </p>
          </div>
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-[65vh] w-[320px] md:w-[500px] bg-[#0c0c0c] border border-white/10 flex-shrink-0 flex flex-col justify-end overflow-hidden hover:border-[#a21441]/50 transition-colors duration-500 rounded-xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 320px, 500px"
                className="object-cover object-top filter grayscale-[30%] brightness-[0.35] group-hover:brightness-[0.55] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                priority={project.id <= 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#a21441]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <div className="relative z-20 p-8 md:p-12">
                <p className="text-[#701c1c] font-sans text-[10px] tracking-[0.2em] uppercase mb-3 opacity-80">
                  {project.category}
                </p>
                <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-2 text-white">
                  {project.title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] bg-[#701c1c] w-0 group-hover:w-full transition-all duration-500 shadow-[0_0_15px_#a21441] z-30" />
            </div>
          ))}
          <div className="min-w-[20vw]" />
        </motion.div>
      </div>
    </section>
  );
}