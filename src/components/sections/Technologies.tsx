"use client";
import { motion, Variants } from "framer-motion";

const techStack = [
  {
    category: "Frontend Core",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Three.js / WebGL"],
  },
  {
    category: "Backend & Heavy Ops",
    items: ["Python", "FastAPI", "Django", "PostgreSQL", "Redis"],
  },
  {
    category: "Architecture",
    items: ["Docker", "GraphQL", "REST APIs", "Microservices", "AWS"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Technologies() {
  return (
    <section id="technologies" className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-transparent">
      <div className="max-w-6xl w-full z-10">
        
        <div className="mb-20">
          <span className="text-[#1c39bb] font-sans text-xs tracking-[1em] uppercase mb-3 block">
            02 / Stack
          </span>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none text-white">
            Architected with<br/>Precision.
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 border-t border-white/5 pt-12"
        >
          {techStack.map((group, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative group bg-white/[0.01] border border-white/5 p-8 rounded-sm hover:border-[#1c39bb] hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#1c39bb] transition-all duration-500 group-hover:w-full shadow-[0_0_10px_#1c39bb]" />
              
              <h3 className="text-xs font-sans tracking-widest uppercase text-white/40 group-hover:text-white transition-colors mb-8">
                {group.category}
              </h3>
              
              <ul className="space-y-4">
                {group.items.map((tech) => (
                  <li 
                    key={tech} 
                    className="text-xl md:text-2xl font-display font-light text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 cursor-default"
                  >
                    <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-[#1c39bb] transition-colors duration-500" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}