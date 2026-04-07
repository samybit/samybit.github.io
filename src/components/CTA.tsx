"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto my-24 px-6"
    >
      {/* The !bg-black and !text-white override the default 
        white background of .brutalist-container 
      */}
      <div className="brutalist-container !bg-black !text-white p-8 md:p-12 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Ready to build?
        </h2>
        <p className="text-xl max-w-xl text-zinc-300">
          Currently open for freelance projects and full-time roles. Let's make something impactful.
        </p>
        <Link
          href="#contact"
          className="group relative inline-flex items-center justify-center bg-white text-black px-8 py-4 text-xl font-bold uppercase tracking-widest border-4 border-white hover:bg-black hover:text-white transition-colors duration-200 mt-4"
        >
          <span>Get in touch</span>
          <ArrowUpRight className="ml-2 w-6 h-6 group-hover:rotate-45 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
}