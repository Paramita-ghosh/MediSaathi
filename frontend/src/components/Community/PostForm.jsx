// import React, { useState } from "react";

// const PostForm = ({ onSubmit }) => {
//   const [form, setForm] = useState({ title: "", content: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.content) return;
//     onSubmit(form);
//     setForm({ title: "", content: "" });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-3 mb-6"
//     >
//       <input
//         type="text"
//         placeholder="Post title..."
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent"
//       />
//       <textarea
//         placeholder="Write something magical..."
//         value={form.content}
//         onChange={(e) => setForm({ ...form, content: e.target.value })}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent"
//       />
//       <button
//         type="submit"
//         className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition"
//       >
//         Post ✨
//       </button>
//     </form>
//   );
// };

// export default PostForm;

import React, { useState } from "react";
import { motion } from "framer-motion";

const PostForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    onSubmit(form);
    setForm({ title: "", content: "" });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative bg-linear-to-br from-[#1a1a25] via-[#202030] to-[#2a2a3f] border border-purple-700/30 backdrop-blur-md p-4 rounded-xl shadow-lg shadow-purple-800/30 space-y-3 mb-6 text-gray-200 font-serif"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing aura */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-transparent blur-2xl opacity-20 rounded-xl pointer-events-none"></div>

      <h2 className="text-lg font-bold text-purple-300 tracking-wide drop-shadow-sm mb-3">
        ✦ Pen Your Arcane Thoughts ✦
      </h2>

      <input
        type="text"
        placeholder="📜 Title of your spell..."
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 bg-[#2c2c3f]/60 border border-purple-800/40 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
      />

      <textarea
        placeholder="💫 Weave your wisdom here..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full p-2 h-28 bg-[#2c2c3f]/60 border border-purple-800/40 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px #a855f7" }}
        whileTap={{ scale: 0.95 }}
        className="bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all shadow-md text-sm"
      >
        Cast ✨
      </motion.button>
    </motion.form>
  );
};

export default PostForm;

