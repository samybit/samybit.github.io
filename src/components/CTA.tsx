"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// --- 3D INTERACTIVE OBJECT ---
function BrutalistGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Constant slow, aggressive rotation
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;

    // Mouse tracking physics (lerping for smooth follow)
    // We multiply by 3 to exaggerate the movement
    const targetX = (state.pointer.x * 3);
    const targetY = (state.pointer.y * 3);

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      {/* A TorusKnot is a complex, mathematical shape. Pure chaos. */}
      <torusKnotGeometry args={[2.5, 0.6, 128, 16]} />
      {/* Pure white wireframe. No lighting needed. */}
      <meshBasicMaterial color="#ffffff" wireframe={true} />
    </mesh>
  );
}

export default function CTA() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden border-t-8 border-b-8 border-black group my-24">

      {/* --- FULL BLEED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* The Painting */}
        <Image
          src="/painting2.jpg"
          alt="Classical Art Background"
          fill
          className="object-cover grayscale contrast-[1.2] brightness-[0.35] group-hover:grayscale-0 group-hover:brightness-[0.6] transition-all duration-700 ease-in-out"
        />

        {/* The 3D Canvas sits ON TOP of the painting, taking up the full screen */}
        <div className="absolute inset-0 z-10 opacity-70">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <BrutalistGeometry />
          </Canvas>
        </div>

        {/* Aggressive dot grid overlay sits ON TOP of the 3D object */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(#000_3px,transparent_0)] bg-[size:16px_16px] opacity-50 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* --- THE CONTENT BOX --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // pointer-events-none on the wrapper so mouse events pass through to the 3D canvas behind it
        className="relative z-30 w-full max-w-5xl px-6 pointer-events-none"
      >
        <div className="brutalist-container !bg-white !text-black p-10 md:p-20 text-center flex flex-col items-center gap-8 shadow-[20px_20px_0px_0px_#000000] pointer-events-auto">

          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Ready to build?
          </h2>

          <p className="text-xl md:text-2xl max-w-2xl font-bold uppercase text-zinc-600">
            Currently open for freelance projects and full-time roles. Let's make something impactful.
          </p>

          <Link
            href="#contact"
            className="group/btn relative inline-flex items-center justify-center bg-black text-white px-10 py-5 text-2xl font-black uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-colors duration-200 mt-6"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="ml-3 w-8 h-8 group-hover/btn:rotate-90 transition-transform duration-200" />
          </Link>

        </div>
      </motion.div>

    </section>
  );
}