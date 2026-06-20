"use client"

import { motion } from "framer-motion";
import FadeIn from "../FedeIn";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center px-6">
      <FadeIn>
        <span className="text-[#ebb40f] tracking-[0.5em] text-sm font-bold uppercase">Team Infinity</span>
        <h1 className="mt-6 text-5xl md:text-8xl sm:text-7xl font-extralight tracking-tighter leading-[0.9]">
          CREATIVE <br /> <span className="text-[#1c39bb]">STUDIO</span>
          <br className="md:hidden" />
        </h1>
        <p className="mt-6 text-gray-500 max-w-xl mx-auto uppercase tracking-[1em] font-thin text-10px">
          Next-Gen Web Development & Design Solutions
        </p>
      </FadeIn>
    </section>
  );
}