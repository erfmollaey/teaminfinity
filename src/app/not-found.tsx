"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  
  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
        },
        modes: {
          bubble: { distance: 120, size: 6, duration: 2, opacity: 1 },
        },
      },
      particles: {
        color: { value: "#22d3ee" },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: { enable: false },
          value: 280,
        },
        opacity: {
          value: { min: 0.4, max: 0.9 },
          animation: { enable: true, speed: 1, minimumValue: 0.4 }
        },
        shape: { type: "circle" },
        size: { value: { min: 2, max: 4.5 } },
      },
      detectRetina: true,
    }),
    []
  );

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    let activeContainer: any = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);
      if (!isMounted) return;

      activeContainer = await tsParticles.load("tsparticles", particlesOptions as any);
    };

    initParticles();

    return () => {
      isMounted = false;
      if (activeContainer) activeContainer.destroy();
    };
  }, [particlesOptions]);

  const svgMask = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><text x='200' y='340' font-size='380' font-family='system-ui, -apple-system, sans-serif' font-weight='900' text-anchor='middle' fill='black'>?</text></svg>")`;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-950 text-white overflow-hidden font-sans ltr">
      
      {mounted && (
        <div 
          className="absolute inset-0 z-0 flex items-center justify-center opacity-35 pointer-events-none select-none w-full h-full"
          style={{
            maskImage: svgMask,
            WebkitMaskImage: svgMask,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        >
          <div id="tsparticles" className="w-full h-full" />
        </div>
      )}

      <div className="z-10 flex flex-col items-center text-center px-4">
        
        <h1 className="text-[clamp(8rem,15vw,16rem)] font-black tracking-tighter leading-none m-0 text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          404
        </h1>
        
        <p className="text-xl text-slate-400 font-light tracking-widest uppercase mt-4">
          Page Not Found
        </p>
        
        <Link
          href="/"
          className="mt-10 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 px-10 py-4 text-base font-medium text-slate-200 no-underline transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:scale-105 active:scale-95"
        >
          Back to Infinity
        </Link>
      </div>
    </div>
  );
}