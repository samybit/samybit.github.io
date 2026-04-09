"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// --- 3D INTERACTIVE OBJECT: THE LIQUID VOID ---
function LiquidAnomaly() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Slow, ominous rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    const targetX = mouse.current.x * 4; // Exaggerated tracking
    const targetY = mouse.current.y * 4;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      {/* High-resolution sphere to allow for smooth liquid distortion */}
      <sphereGeometry args={[2.5, 64, 64]} />
      {/* This is where the magic happens. 
        It mathematically warps the vertices of the sphere in real-time.
      */}
      <MeshDistortMaterial
        color="#ffffff"
        distort={0.2} // How aggressively the shape morphs
        speed={2}     // How fast it breathes
        roughness={0}
      />
    </mesh>
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
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden border-t-8 border-b-8 border-black group my-24 bg-black">

      {/* --- LAYER 1: BACKGROUND (z-0) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/painting2.jpg"
          alt="Classical Art Background"
          fill
          className="object-cover grayscale contrast-[1.2] brightness-[0.35] group-hover:grayscale-0 group-hover:brightness-[0.6] transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#000_3px,transparent_0)] bg-[size:16px_16px] opacity-50 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* --- LAYER 2: CONTENT BOX (z-10) --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl px-6 pointer-events-none"
      >
        <div className="brutalist-container !bg-white !text-black p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-[16px_16px_0px_0px_#000000] pointer-events-auto">
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

          {/* THE FIX: We must add lights for physical materials to be visible */}
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={3} />

          <LiquidAnomaly />
        </Canvas>
      </div>

    </section>
  );
}