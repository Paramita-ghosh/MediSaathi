import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Heart, Sparkles } from "lucide-react";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-950 text-gray-100 relative overflow-hidden"
    >
      {/* Magical Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-accent/20 blur-3xl rounded-full top-[-10%] left-[-10%] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-700/20 blur-3xl rounded-full bottom-[-10%] right-[-10%] animate-pulse"></div>
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

      {/* Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="z-10 text-center px-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-accent via-purple-400 to-pink-400 mb-6 font-serif">
          Contact Us
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-12">
          We’d love to hear from you! Whether it’s feedback, collaboration, or a friendly hello, 
          reach out and let’s create something extraordinary together.
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Paramita Ghosh */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-accent/40 transition-all"
          >
            <h2 className="text-2xl font-bold text-accent mb-3">Paramita Ghosh</h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:paramitaghosh0110@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition"
              >
                <Mail className="w-5 h-5" /> Gmail
              </a>
              <a
                href="https://www.linkedin.com/in/paramita-ghosh-9272b936a/"
                target="_blank"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Nishi Gupta */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-accent/40 transition-all"
          >
            <h2 className="text-2xl font-bold text-accent mb-3">Nishi Gupta</h2>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:guptanishi9520@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition"
              >
                <Mail className="w-5 h-5" /> Gmail
              </a>
              <a
                href="https://www.linkedin.com/in/nishi-gupta-299929344/"
                target="_blank"
                className="flex items-center gap-2 text-gray-300 hover:text-accent transition"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-gray-400 text-sm flex items-center justify-center gap-2"
        >
          Made with <Heart className="w-4 h-4 text-accent" /> by Team ChronoAlchemists
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
