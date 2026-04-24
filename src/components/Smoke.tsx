"use client";

import { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Smoke({ inverse = false, isActive = false }: { inverse?: boolean; isActive?: boolean }) {
  const [init, setInit] = useState(false);
  // Generate a safe ID for the canvas by removing React's default colons
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  // The secret to the smoke: expanding the canvas slightly beyond the button (inset-[-20%]),
  // adding a heavy blur-[6px] to melt the circles together, and using mix-blend modes.
  return (
    <div
      className={`absolute inset-[-20%] z-0 pointer-events-none blur-[6px] transition-opacity duration-500
      ${inverse ? "mix-blend-multiply" : "mix-blend-screen"}
      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
    >
      <Particles
        id={`smoke-${id}`}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            number: {
              value: 30, // Dense enough to form solid clouds
              density: { enable: true, width: 100, height: 100 },
            },
            color: { value: inverse ? "#000000" : "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.1, max: inverse ? 0.7 : 0.35 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            size: {
              value: { min: 10, max: 40 },
              animation: { enable: true, speed: 5, sync: false },
            },
            move: {
              enable: true,
              speed: { min: 0.5, max: 2 },
              direction: "top",
              random: true,
              straight: false,
              outModes: { default: "out" }, // Infinite updraft loop
            },
          },
        }}
        className="w-full h-full"
      />
    </div>
  );
}