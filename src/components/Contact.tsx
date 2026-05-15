"use client";

import { Send, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "@/actions/send-email";
import { playPowerUp } from "@/utils/audio";
import DecryptText from "@/components/DecryptText";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const isNameValid = values.name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  const isMessageValid = values.message.trim().length > 0;

  // --- 3D PHYSICS ENGINE SETUP ---
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Heavy, mechanical spring settings
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Subtle rotation to keep the form usable (Max 6 degrees)
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  // Brutalist light sheen that sweeps across the form
  const glareX = useTransform(springX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["-100%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseLeave() {
    // Snap back to center when the mouse leaves
    mouseX.set(0.5);
    mouseY.set(0.5);
  }
  // -------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      let isValid = false;
      if (name === "name") isValid = value.trim().length > 0;
      if (name === "email") isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (name === "message") isValid = value.trim().length > 0;

      if (isValid) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  async function clientAction(formData: FormData) {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!isNameValid) newErrors.name = "NAME IS REQUIRED.";
    if (!isEmailValid) newErrors.email = "VALID EMAIL IS REQUIRED.";
    if (!isMessageValid) newErrors.message = "MESSAGE IS REQUIRED.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  const inputBaseStyle = "p-4 border-4 text-xl resize-none focus:outline-none transition-colors duration-150 relative z-20";

  const getInputStyle = (isValid: boolean, isError: boolean) => {
    if (isError) return `${inputBaseStyle} border-red-600 bg-red-50 text-black`;
    if (isValid) return `${inputBaseStyle} border-black bg-black text-white focus:ring-4 focus:ring-black/20`;
    return `${inputBaseStyle} border-black bg-white text-black focus:ring-4 focus:ring-black/20`;
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">

        {/* --- LEFT COLUMN: TEXT & SOCIALS --- */}
        <div className="flex-1 w-full relative z-30">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 relative z-30">
            <DecryptText text="Let's" />
            <br />
            <DecryptText text="Talk" />
          </h2>
          <p className="text-2xl font-bold max-w-md text-zinc-400 uppercase mb-16 relative z-30">
            Drop a message to discuss a project, a full-time role, or just to say hi.
          </p>

          <div className="flex flex-col gap-4 relative z-30">
            <h3 className="text-xl font-black uppercase tracking-widest text-zinc-400 mb-2 border-b-4 border-white pb-2 inline-block self-start">
              Verified Networks
            </h3>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="https://linkedin.com/in/samybit/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-4 border-white px-6 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-colors">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://www.upwork.com/freelancers/~015e572ae8edee2be8" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-4 border-white px-6 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-colors">
                <span>Upwork</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://contra.com/samy_barsoum_akavah3d" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-4 border-white px-6 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-colors">
                <span>Contra</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://mostaql.com/u/Samy_01" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-4 border-white px-6 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-colors">
                <span>mostaql</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: 3D FORM ENGINE --- */}
        <div
          className="flex-1 w-full relative"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Static Brutalist Drop Shadow (Stays in place while the form tilts) */}
          <div className="absolute inset-0 bg-zinc-800 border-4 border-white translate-x-4 translate-y-4 z-0 pointer-events-none" />

          {/* The Physical 3D Form */}
          <motion.form
            action={clientAction}
            noValidate
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              // Pops the form off the background so the tilt feels physical
              translateZ: 30
            }}
            className="relative z-10 bg-white text-black border-4 border-black flex flex-col gap-6 p-8 overflow-hidden shadow-2xl"
          >
            {/* Hard-edged Glare Effect (Moves opposite to the mouse) */}
            <motion.div
              style={{ x: glareX, y: glareY }}
              className="absolute inset-0 z-0 pointer-events-none opacity-20"
              initial={false}
            >
              <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-[linear-gradient(45deg,transparent_40%,white_50%,transparent_60%)] mix-blend-overlay" />
            </motion.div>

            {status === "success" ? (
              <div className="p-8 border-4 border-black bg-green-400 text-black text-2xl font-black uppercase text-center flex flex-col items-center gap-4 relative z-20">
                <Check size={48} className="text-black" />
                Message Received. I'll be in touch.
              </div>
            ) : (
              <>
                {/* Wrapped inputs in relative z-20 so they sit above the glare and remain highly clickable */}
                <div className="flex flex-col gap-2 relative z-20">
                  <label htmlFor="name" className="text-xl font-black uppercase tracking-wide flex justify-between">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={getInputStyle(isNameValid, !!errors.name)}
                    placeholder="Ada Lovelace"
                  />
                  {errors.name && (
                    <span className="text-red-600 font-black uppercase tracking-wide border-l-4 border-red-600 pl-2 mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative z-20">
                  <label htmlFor="email" className="text-xl font-black uppercase tracking-wide flex justify-between">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={getInputStyle(isEmailValid, !!errors.email)}
                    placeholder="ada@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-600 font-black uppercase tracking-wide border-l-4 border-red-600 pl-2 mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative z-20">
                  <label htmlFor="message" className="text-xl font-black uppercase tracking-wide flex justify-between">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                    className={getInputStyle(isMessageValid, !!errors.message)}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <span className="text-red-600 font-black uppercase tracking-wide border-l-4 border-red-600 pl-2 mt-1">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={() => playPowerUp()}
                  disabled={status === "loading"}
                  // Transform-Z on the button creates a parallax pop-out effect when tilted
                  style={{ transform: "translateZ(15px)" }}
                  className="mt-4 flex items-center justify-center gap-3 bg-black text-white p-5 text-2xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative z-20 shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status === "error" && (
                  <p className="text-red-600 font-black uppercase text-center mt-2 border-4 border-red-600 p-2 bg-red-100 relative z-20">
                    FAILED TO SEND. PLEASE TRY AGAIN.
                  </p>
                )}
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}