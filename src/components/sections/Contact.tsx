"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: "success", message: "Your message has been sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.detail || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Unable to connect to the server. Is the backend running?" });
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-transparent">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-5xl w-full bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-sm p-8 md:p-16 overflow-hidden shadow-2xl"
      >
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#ebb40f] to-transparent shadow-[0_0_15px_#1c39bb]"
        />

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="text-[#ebb40f] font-sans text-xs tracking-[1em] uppercase mb-3 block">
                05 / Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter leading-none text-white">
                Let's build<br />something<br /><span className="text-[#ebb40f]">Epic.</span>
              </h2>
            </div>
            <p className="text-white/40 font-sans font-light text-xs leading-relaxed max-w-xs">
              Have an idea, a full-stack project, or just want to chat about clean architecture? Drop a line and let's make it happen.
            </p>
          </div>
          <div className="md:col-span-3 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="YOUR NAME"
                  disabled={status.type === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs font-sans tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-[#1c39bb] transition-colors disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 h-[1px] bg-[#ebb40f] w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#1c39bb]" />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="YOUR EMAIL"
                  disabled={status.type === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs font-sans tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-[#1c39bb] transition-colors disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 h-[1px] bg-[#ebb40f] w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#1c39bb]" />
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="YOUR MESSAGE"
                  disabled={status.type === "loading"}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-xs font-sans tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-[#1c39bb] transition-colors resize-none disabled:opacity-50"
                />
                <span className="absolute bottom-0 left-0 h-[1px] bg-[#ebb40f] w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_#1c39bb]" />
              </div>
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="relative w-full py-4 bg-transparent border border-white/10 text-[10px] font-sans tracking-[0.4em] uppercase text-white overflow-hidden transition-all duration-500 hover:border-[#ebb40f] group disabled:opacity-50 cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#ebb40f]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">
                  {status.type === "loading" ? "SENDING..." : "DISPATCH MESSAGE"}
                </span>
              </button>
              <AnimatePresence mode="wait">
                {status.type !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`text-[11px] font-sans tracking-wider p-4 border rounded-sm ${
                      status.type === "success"
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                        : status.type === "error"
                        ? "bg-rose-500/5 border-rose-500/20 text-rose-400"
                        : "bg-white/5 border-white/10 text-white/60"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>
          
        </div>
      </motion.div>

    </section>
  );
}