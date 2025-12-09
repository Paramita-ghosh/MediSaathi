import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black text-gray-100 relative overflow-hidden"
    >
      {/* Magical Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-accent/20 blur-3xl rounded-full top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full bottom-[-10%] right-[-10%] animate-pulse"></div>
      </div>

      {/* Floating Sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 left-10 text-accent"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-10 right-10 text-purple-400"
      >
        <Star className="w-8 h-8" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center px-6 max-w-3xl"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-accent via-purple-400 to-pink-400 mb-6 font-serif"
        >
          About The Alchemist
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8"
        >
          Step into the world of <span className="text-accent font-semibold">Alchemist</span>, 
          your intelligent health companion. Designed to blend science, care, and AI magic — 
          we help you manage medications, track schedules, and simplify your wellness journey.  
          Every interaction is guided by compassion and technology in perfect harmony.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-6"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #fff" }}
            className="px-6 py-3 rounded-full bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-accent/40 transition-all duration-300"
          >
            Explore More
          </motion.a>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-full border border-purple-500 text-purple-400 font-semibold 
                        hover:bg-purple-600 hover:text-white transition-all duration-300 
                        shadow-lg hover:shadow-purple-500/40 backdrop-blur-sm"
            >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Magic Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent/70"
      >
        <Zap className="w-12 h-12" />
      </motion.div>
    </motion.div>
  );
};

export default About;
