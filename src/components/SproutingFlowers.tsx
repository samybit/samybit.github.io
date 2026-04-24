"use client";

import { motion } from "framer-motion";

// Responsive lengths using clamp(MIN, IDEAL, MAX) so they perfectly fit Mobile and Desktop
const FLOWERS = [
  // --- TOP BORDER (Sprouting Up) ---
  { id: 1, anchor: "bottom-full left-[10%] rotate-0", tilt: -20, h: "clamp(60px, 10vw, 120px)", delay: 0.1, icon: "✿" },
  { id: 2, anchor: "bottom-full left-[50%] rotate-0", tilt: 5, h: "clamp(80px, 15vw, 180px)", delay: 0, icon: "❀" },
  { id: 3, anchor: "bottom-full left-[85%] rotate-0", tilt: 25, h: "clamp(70px, 12vw, 140px)", delay: 0.2, icon: "❁" },

  // --- RIGHT BORDER (Sprouting Right) ---
  { id: 4, anchor: "top-[20%] left-full rotate-90", tilt: 15, h: "clamp(50px, 8vw, 110px)", delay: 0.15, icon: "✽" },
  { id: 5, anchor: "top-[70%] left-full rotate-90", tilt: -10, h: "clamp(40px, 6vw, 90px)", delay: 0.25, icon: "✿" },

  // --- BOTTOM BORDER (Sprouting Down, behind Barsoum) ---
  { id: 6, anchor: "top-full left-[25%] rotate-180", tilt: 15, h: "clamp(60px, 10vw, 130px)", delay: 0.3, icon: "❁" },
  { id: 7, anchor: "top-full left-[75%] rotate-180", tilt: -15, h: "clamp(50px, 8vw, 100px)", delay: 0.2, icon: "✽" },

  // --- LEFT BORDER (Sprouting Left) ---
  { id: 8, anchor: "top-[50%] right-full -rotate-90", tilt: -15, h: "clamp(50px, 8vw, 100px)", delay: 0.1, icon: "❀" },
];

export default function SproutingFlowers({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      {FLOWERS.map((f) => (
        // 1. The Anchor Point (Places the base exactly on the border and rotates it to face outward)
        <div
          key={f.id}
          className={`absolute w-0 h-0 flex justify-center items-end pointer-events-none z-[-1] ${f.anchor}`}
        >
          {/* 2. The Stem & Growth Animation */}
          <motion.div
            className="absolute bottom-0 origin-bottom flex flex-col items-center justify-end"
            initial={{ height: 0, opacity: 0, rotate: 0 }}
            animate={{
              height: isHovered ? f.h : 0,
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? f.tilt : 0
            }}
            transition={{
              duration: 0.4,
              delay: isHovered ? f.delay : 0,
              ease: [0.34, 1.56, 0.64, 1], // Heavy mechanical bounce
            }}
          >
            {/* 3. The Flower Head */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{
                scale: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -90,
              }}
              transition={{
                duration: 0.5,
                delay: isHovered ? f.delay + 0.15 : 0,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              // The white border/shadow separates the black flowers from dark backgrounds
              className="text-4xl md:text-6xl -mb-3 md:-mb-4 z-10 text-black drop-shadow-[2px_2px_0px_#FFFFFF]"
            >
              {f.icon}
            </motion.div>

            {/* 4. The Mechanical Iron Stem */}
            <div className="w-1.5 md:w-2 h-full bg-black border-[1px] md:border-2 border-white" />
          </motion.div>
        </div>
      ))}
    </>
  );
}