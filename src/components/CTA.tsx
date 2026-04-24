"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// --- 3D INTERACTIVE OBJECT: THE LIQUID ANOMALY LEAK ---
function SystemLeak() {
  const coreRef = useRef<THREE.Mesh>(null);
  const dropsGroupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generate 25 "drops" with random speeds, sizes, and initial offsets
  const dropsData = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
      offsetX: (Math.random() - 0.5) * 1.5,
      offsetY: (Math.random() - 0.5) * 1.5,
      speed: Math.random() * 0.04 + 0.01,
      scale: Math.random() * 0.15 + 0.05,
      rotSpeedX: Math.random() * 0.05,
      rotSpeedY: Math.random() * 0.05,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const core = coreRef.current;
    const dropsGroup = dropsGroupRef.current;

    if (!core || !dropsGroup) return;

    const targetX = mouse.current.x * 4;
    const targetY = mouse.current.y * 4;

    core.position.x += (targetX - core.position.x) * 0.05;
    core.position.y += (targetY - core.position.y) * 0.05;
    core.rotation.x += 0.01;
    core.rotation.y += 0.02;

    dropsGroup.children.forEach((drop, index) => {
      const data = dropsData[index];

      drop.position.y -= data.speed;
      drop.rotation.x += data.rotSpeedX;
      drop.rotation.y += data.rotSpeedY;

      if (drop.position.y < -5) {
        drop.position.x = core.position.x + data.offsetX;
        drop.position.y = core.position.y + data.offsetY;
      }
    });
  });

  return (
    <>
      {/* The Liquid Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <MeshDistortMaterial
          color="#E0F0F4"
          distort={0.3}
          speed={1}
          roughness={1}
        />
      </mesh>

      {/* The Leaking Data Drops */}
      <group ref={dropsGroupRef}>
        {dropsData.map((data, i) => (
          <mesh key={i} position={[0, -10, 0]} scale={data.scale}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function CTA() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#contact");
    }
  };

  return (
    // Changed to min-h-screen and removed my-24 so it spans the entire viewport seamlessly
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden border-t-8 border-b-8 border-black group bg-black">

      {/* --- LAYER 1: MECHANICAL ARROW BACKGROUND (z-0) --- */}
      <div
        className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          // Pure CSS SVG Data URI: Creates the 45-degree arrow hitting a perpendicular barrier
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg stroke='%23333333' stroke-width='3' fill='none' stroke-linecap='square' stroke-linejoin='miter'%3E%3Cline x1='20' y1='60' x2='60' y2='20' /%3E%3Cpolyline points='46,20 60,20 60,34' /%3E%3Cline x1='52' y1='12' x2='68' y2='28' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px"
        }}
      ></div>

      {/* --- LAYER 2: CONTENT BOX (z-10) --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl px-6 pointer-events-none"
      >
        <div className="brutalist-container bg-white text-black border-4 border-black p-8 md:p-12 text-center flex flex-col items-center gap-6 brutalist-shadow pointer-events-auto">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Ready to build?
          </h2>
          <p className="text-lg md:text-xl max-w-lg font-bold uppercase text-zinc-600">
            Currently open for freelance projects and full-time roles. Let's make something impactful.
          </p>
          <Link
            href="/#contact"
            onClick={handleScroll}
            className="group/btn relative inline-flex items-center justify-center bg-black text-white px-8 py-4 text-xl font-black uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors duration-200 mt-4"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="ml-3 w-6 h-6 group-hover/btn:rotate-90 transition-transform duration-200" />
          </Link>
        </div>
      </motion.div>

      {/* --- LAYER 3: 3D SCANNER (z-20) --- */}
      <div className="absolute inset-0 z-20 mix-blend-difference pointer-events-none">
        <Canvas style={{ pointerEvents: "none" }} camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={3} />
          <SystemLeak />
        </Canvas>
      </div>

    </section>
  );
}