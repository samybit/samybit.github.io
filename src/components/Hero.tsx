"use client";

import { ArrowDownRight, Download } from "lucide-react";
import Link from "next/link";
import Spline from '@splinetool/react-spline';
import GlitchText from "@/components/GlitchText";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export default function Hero() {
  // 1. Hardware Observer: 0px margin means it strictly kills the engine the exact pixel it leaves the screen
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { margin: "0px" });

  // 2. Spline Runtime State
  const [splineApp, setSplineApp] = useState<any>(null);

  // 3. The Optimization Engine: Pauses WebGL rendering when scrolled away
  useEffect(() => {
    if (splineApp) {
      if (isInView) {
        splineApp.play(); // Resume animation when visible
      } else {
        splineApp.stop(); // Kill rendering loop to save CPU/Battery
      }
    }
  }, [isInView, splineApp]);

  return (
    // REMOVED 'bg-white' from this section so the dots on the body show through!
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden border-b-8 border-black pt-32 pb-8 px-6 md:px-12 lg:px-24"
    >

      {/* --- LAYER 1: SPLINE 3D SCENE --- */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/7ztL0oWOFnobjnom/scene.splinecode"
          className="w-full h-full"
          // Grab the internal application instance when it loads
          onLoad={(spline) => setSplineApp(spline)}
        />
      </div>

      {/* --- LAYER 2: FLOATING TYPOGRAPHY (Top Left) --- */}
      <div className="relative z-10 pointer-events-none animate-slide-up flex flex-col items-start w-full">

        <div className="mb-6 pointer-events-auto inline-flex max-w-full">
          <span className="bg-white text-black text-sm sm:text-base md:text-xl font-bold uppercase tracking-widest border-4 border-black px-3 py-1.5 md:px-4 md:py-2 brutalist-shadow whitespace-normal sm:whitespace-nowrap text-left">
            Available for Freelance & Roles
          </span>
        </div>

        <h1 className="text-[16vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none pointer-events-auto inline-block max-w-full">
          <span className="bg-white text-black px-2 md:px-4 py-1 md:py-2 border-4 border-black brutalist-shadow inline-block">
            Samy
          </span>
          <br />
          <span className="bg-black text-white px-2 md:px-4 py-1 md:py-2 inline-block mt-3 md:mt-4 transform -skew-x-6 cursor-crosshair brutalist-shadow border-4 border-white max-w-full overflow-hidden">
            <GlitchText text="Barsoum" />
          </span>
        </h1>
      </div>

      {/* --- LAYER 3: FLOATING ACTIONS (Bottom Right) --- */}
      <div className="relative z-10 pointer-events-none flex flex-col sm:flex-row justify-end items-end gap-4 mt-auto animate-slide-up-delay-1 lg:translate-x-8 xl:translate-x-16">

        <Link href="#projects" className="pointer-events-auto brutalist-shadow bg-black text-white border-4 border-black px-4 py-3 md:px-6 md:py-4 hover:bg-white hover:text-black flex justify-between items-center gap-3 md:gap-4 text-lg md:text-2xl font-black uppercase transition-all group w-full sm:w-auto">
          <span>Work</span>
          <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform w-6 h-6 md:w-8 md:h-8" />
        </Link>

        <Link href="#contact" className="pointer-events-auto brutalist-shadow bg-white text-black border-4 border-black px-4 py-3 md:px-6 md:py-4 hover:bg-black hover:text-white flex justify-between items-center gap-3 md:gap-4 text-lg md:text-2xl font-black uppercase transition-all group w-full sm:w-auto">
          <span>Contact</span>
          <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform w-6 h-6 md:w-8 md:h-8" />
        </Link>

        <a
          href="/Samy_Barsoum_CV.pdf"
          download="Samy_Barsoum_CV.pdf"
          className="pointer-events-auto brutalist-shadow bg-white text-black border-4 border-black px-4 py-3 md:px-6 md:py-4 hover:bg-black hover:text-white flex justify-between items-center gap-3 md:gap-4 text-lg md:text-2xl font-black uppercase transition-all group w-full sm:w-auto"
        >
          <span>Get CV</span>
          <Download className="group-hover:translate-y-1 transition-transform w-6 h-6 md:w-8 md:h-8" />
        </a>

      </div>
    </section>
  );
}