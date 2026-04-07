"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function action(formData: FormData) {
    setStatus("loading");
    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">

        <div className="flex-1">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Let's <br /> Talk
          </h2>
          <p className="text-2xl font-bold max-w-md text-zinc-400 uppercase">
            Drop a message to discuss a project, a full-time role, or just to say hi.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <form action={action} className="brutalist-container text-black flex flex-col gap-6">

            {status === "success" ? (
              <div className="p-8 border-4 border-black bg-green-400 text-black text-2xl font-black uppercase text-center">
                Message Received. I'll be in touch.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xl font-black uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="p-4 border-4 border-black text-xl focus:outline-none focus:ring-4 focus:ring-black/20 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xl font-black uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="p-4 border-4 border-black text-xl focus:outline-none focus:ring-4 focus:ring-black/20 transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xl font-black uppercase tracking-wide">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="p-4 border-4 border-black text-xl resize-none focus:outline-none focus:ring-4 focus:ring-black/20 transition-shadow"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 flex items-center justify-center gap-3 bg-black text-white p-5 text-2xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status === "error" && (
                  <p className="text-red-600 font-bold uppercase text-center mt-2">Failed to send. Try again.</p>
                )}
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}