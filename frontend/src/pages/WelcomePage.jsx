import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { GiCauldron } from "react-icons/gi";

const WelcomePage = () => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set([iconRef.current, titleRef.current, textRef.current, buttonsRef.current], {
      opacity: 0,
    });
    gsap.set(iconRef.current, { scale: 0.5, rotate: -30 });
    gsap.set(titleRef.current, { y: 30 });
    gsap.set(textRef.current, { y: 20 });
    gsap.set(buttonsRef.current, { y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(iconRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.8,
      delay: 0.2,
    })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
  }, []);

  // More visible, darker floating bubbles
  const bubbles = Array.from({ length: 45 });

  // Test tube positions
  const testTubePositions = [
    { top: "10%", left: "5%", rotate: -10 },
    { top: "20%", left: "85%", rotate: 15 },
    { top: "40%", left: "10%", rotate: -20 },
    { top: "60%", left: "80%", rotate: 25 },
    { top: "75%", left: "15%", rotate: 10 },
    { top: "25%", left: "65%", rotate: -15 },
    { top: "50%", left: "5%", rotate: 5 },
    { top: "85%", left: "70%", rotate: -25 },
  ];

  return (
    <div
      className="relative min-h-screen bg-linear-to-b from-[#020617] to-[#0f172a] flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-40 bg-gradient-to-t from-[#22c55e] to-[#4ade80] rounded-t-full blur-md shadow-[0_0_40px_#22c55e]/70"></div> */}

      {/* Larger, darker floating bubbles */}
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            bottom: `${Math.random() * 30}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 12 + 8}px`,
            height: `${Math.random() * 12 + 8}px`,
            backgroundColor: [
              "#14532d", // very dark green
              "#1e3a8a", // deep blue
              "#831843", // dark magenta
              "#78350f", // brownish yellow
              "#064e3b", // dark teal
            ][i % 5],
            filter: "blur(3px)",
            opacity: 0.9,
          }}
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: -Math.random() * 700 - 300, opacity: 0 }}
          transition={{
            duration: Math.random() * 10 + 6,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Blurred test tubes */}
      {testTubePositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-10 h-20 rounded-b-full border-2 border-[#a7f3d0]/40 bg-linear-to-t from-[#0f172a]/90 to-transparent shadow-[0_0_25px_#22c55e]/40 blur-sm"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate}deg)`,
            zIndex: 1,
          }}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-full rounded-b-full"
            style={{
              height: `${Math.random() * 50 + 20}%`,
              background: `linear-gradient(to top, ${
                ["#22c55e", "#3b82f6", "#f472b6", "#eab308", "#10b981"][i % 5]
              }, transparent)`,
              filter: "blur(1.5px)",
              opacity: 0.9,
            }}
            animate={{ height: ["20%", "70%", "30%", "60%"], opacity: [0.8, 1, 0.6] }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}

      {/* Foreground content */}
      <div className="text-center relative z-10 bg-transparent">
        <div className="flex justify-center items-center mb-6">
          <div ref={iconRef}>
            <GiCauldron className="text-[#22c55e] text-7xl mr-4 drop-shadow-[0_0_15px_#22c55e]" />
          </div>
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider"
          >
            MediSaathi
          </h1>
        </div>
        <p
          ref={textRef}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Your personal wellness companion for mastering the complex potions of
          modern life. Track your medications with magical precision.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 12px rgba(82, 216, 93, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-48 bg-[#22c55e] text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            >
              Begin Your Journey
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 12px rgba(82, 216, 93, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-48 bg-[#22c55e] text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            >
              I Have a <br /> Grimoire
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
