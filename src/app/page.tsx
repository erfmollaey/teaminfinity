import GlobalCanvas from "@/components/ui/GlobalCanvas";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Technologies from "@/components/sections/Technologies";
import Works from "@/components/sections/Works";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <main className="relative">
      
      <GlobalCanvas />

      < Navbar />

      <div className="relative z-10">
        <Hero />
        
        <About />

        <Technologies />

        <Works />

        <Process />

        <Contact />
      </div>

      <footer className="relative z-10 py-10
      text-center border-t border-white/5 bg-black/20
      backdrop-blur-md">
        <p className="text-[10px] text-white/20
        tracking-[0.5em] uppercase">
          © {new Date().getFullYear()}
          Infinity™ | Engineered for Infinity
        </p>
      </footer>
    </main>
  );
}