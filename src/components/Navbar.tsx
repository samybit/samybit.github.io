"use client";

import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white border-b-8 border-black px-6 md:px-12 py-4 flex justify-between items-center"
    >
      <a href="#" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
        <TerminalSquare size={32} className="text-black" />
        <span className="text-2xl font-black uppercase tracking-tighter">Samy.</span>
      </a>

      <div className="hidden md:flex items-center gap-8 text-lg font-bold uppercase tracking-wide">
        <a href="#projects" className="hover:underline underline-offset-8 decoration-4">Work</a>
        <a href="https://github.com/samybit" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-8 decoration-4">GitHub</a>
        <a
          href="#contact"
          className="bg-black text-white px-5 py-2 hover:bg-white hover:text-black border-4 border-black transition-colors"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}