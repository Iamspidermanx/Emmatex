import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import About from "./About.jsx";
import Vision from "./Vision.jsx";

export default function Welcome() {
  const navigate = useNavigate();

  // ⬅️ Auto-skip return visitors
  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (visited === "1") {
      navigate("/");
    }
  }, []);

  function handleCTA() {
    localStorage.setItem("visited", "1");
    navigate("/");
  }

  const demoVideo =
    "https://res.cloudinary.com/dvxq96bcp/video/upload/q_auto/v1763374621/InShot_20251117_110844013_r5svoe.mp4";

  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center">

        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={demoVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Colored gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-pink-400/25 to-yellow-300/20 mix-blend-multiply" />

        {/* Dark fade overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-wide text-white animate__animated animate__fadeIn drop-shadow-lg leading-snug"
          >
            Where Businesses Meet Unlimited Online Customers
          </motion.h1>

          {/* CTA button */}
          <motion.button
            onClick={handleCTA}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 8 }} 
            className="mt-10 inline-flex items-center font-semibold gap-2 
                       bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-600 
                       text-white px-8 py-3 rounded-md shadow-lg 
                       hover:scale-[1.03] transition-transform"
          >
            View Products
          </motion.button>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <About />
      <Vision />
    </div>
  );
}
