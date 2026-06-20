"use client";
import React, { useEffect, useState } from "react";

interface Step {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  techs: string[];
}

const steps: Step[] = [
  {
    id: "discovery",
    number: "01",
    title: "DISCOVERY & BLUEPRINT",
    subtitle: "Requirements Analysis & Roadmap Design",
    description: "In this phase, project objectives, system requirements, and data architecture scales are thoroughly analyzed, resulting in a meticulously documented High-Level System Architecture.",
    techs: ["Requirements Gathering", "System Architecture", "Feasibility Study"],
  },
  {
    id: "design",
    number: "02",
    title: "ARCHITECTURAL DESIGN",
    subtitle: "Infrastructure & Database Engineering",
    description: "Designing database schemas, defining microservices boundaries, establishing robust communication protocols (gRPC/REST), and selecting the optimal technology stack tailored for specific scalability requirements.",
    techs: ["Database Schema", "API Contracts", "Microservices Design"],
  },
  {
    id: "execution",
    number: "03",
    title: "AGILE EXECUTION",
    subtitle: "Agile Development & Clean Code",
    description: "Implementing frontend interfaces with highly optimized UI components and engineering a modular, testable, and robust backend ecosystem accompanied by continuous error monitoring.",
    techs: ["Clean Code", "Unit Testing", "CI/CD Pipelines"],
  },
  {
    id: "deployment",
    number: "04",
    title: "DEPLOYMENT & SYNC",
    subtitle: "Production Deployment & Live Monitoring",
    description: "Containerizing services with Docker, configuring load balancers, and deploying to high-availability clusters alongside live monitoring tools to guarantee 100% uptime.",
    techs: ["Docker & AWS", "Live Monitoring", "Optimization"],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<string>("discovery");

  useEffect(() => {
    const elements = document.querySelectorAll(".process-step-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-28% 0px -42% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="relative min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="mb-20 text-left">
        <span className="text-[#ff5500] text-xs font-mono tracking-[0.3em] uppercase block mb-3">
          04 / P R O C E S S
        </span>
        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-none uppercase font-serif">
          THE ARCHITECTURE OF <br />
          <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            EXECUTION.
          </span>
        </h2>
      </div>

      {/* Timeline Dynamic Wrapper */}
      <div className="relative border-l border-neutral-800/60 pl-8 space-y-16">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          
          return (
            <div 
              key={step.id} 
              id={step.id}
              className="process-step-card relative flex flex-col md:flex-row items-start md:justify-between gap-6 transition-all duration-700"
            >
              {/* Dynamic Neon Pointer */}
              <div className={`absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border transition-all duration-500 ${
                isActive 
                  ? "border-[#ff5500] bg-[#ff5500] shadow-[0_0_15px_rgba(255,85,0,0.8)] scale-110" 
                  : "border-neutral-700 shadow-none scale-100"
              }`} />

              {/* Dynamic Step Titles */}
              <div className="w-full md:w-1/3 text-left">
                <span className={`text-5xl font-extrabold font-mono transition-colors duration-500 block mb-1 ${
                  isActive ? "text-[#ff5500]/25" : "text-neutral-800"
                }`}>
                  {step.number}
                </span>
                <h3 className={`text-xl font-bold tracking-wider transition-colors duration-500 font-sans ${
                  isActive ? "text-[#ff5500]" : "text-white"
                }`}>
                  {step.title}
                </h3>
                <p className={`text-xs mt-1 font-sans transition-colors duration-500 ${
                  isActive ? "text-neutral-300" : "text-neutral-500"
                }`}>
                  {step.subtitle}
                </p>
              </div>

              {/* Dynamic Content Box */}
              <div className={`w-full md:w-2/3 bg-[#010101]/40 border p-6 md:p-8 rounded-lg backdrop-blur-md transition-all duration-500 ${
                isActive ? "border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : "border-neutral-900/80"
              }`}>
                <p className={`text-sm leading-relaxed text-justify mb-6 font-sans transition-colors duration-500 ${
                  isActive ? "text-neutral-200" : "text-neutral-400"
                }`}>
                  {step.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 justify-start">
                  {step.techs.map((tech) => (
                    <span 
                      key={tech} 
                      className={`text-[10px] font-mono uppercase bg-neutral-950 px-3 py-1 rounded border transition-all duration-500 ${
                        isActive 
                          ? "border-neutral-800 text-neutral-300" 
                          : "border-neutral-900 text-neutral-600"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}