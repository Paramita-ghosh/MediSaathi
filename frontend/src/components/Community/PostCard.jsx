// import React from "react";
// import { Heart } from "lucide-react";

// const PostCard = ({ post, onLike }) => {
//   return (
//     <div className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300">
//       <h2 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h2>
//       <p className="text-gray-700 mb-3">{post.content}</p>
//       <div className="flex justify-between items-center text-sm text-gray-500">
//         <span>By {post.author?.name || "Anonymous"}</span>
//         <button
//           onClick={() => onLike(post._id)}
//           className="flex items-center gap-1 hover:text-red-500 transition-all"
//         >
//           <Heart className="w-4 h-4" /> {post.likes}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const PostCard = ({ post, onLike }) => {
  return (
    <motion.div
      className="relative bg-linear-to-br from-[#12121a] via-[#1a1a25] to-[#202035] border border-purple-700/30 rounded-xl p-4 shadow-md hover:shadow-purple-800/40 transition-all duration-300 text-gray-200 font-serif overflow-hidden"
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {/* Magical aura */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-pink-500/10 to-transparent blur-2xl opacity-20 pointer-events-none"></div>

      <h2 className="text-base md:text-lg font-bold text-purple-300 drop-shadow-sm mb-2 tracking-wide">
        ✦ {post.title}
      </h2>
      <p className="text-sm text-gray-300 mb-3 leading-relaxed">
        {post.content}
      </p>
      <div className="flex justify-between items-center text-xs md:text-sm text-gray-400">
        <span className="italic">— {post.author?.name || "Anonymous Sage"}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ color: "#f87171", scale: 1.05 }}
          onClick={() => onLike(post._id)}
          className="flex items-center gap-1 transition-all duration-200 text-gray-300 hover:text-red-400"
        >
          <Heart className="w-4 h-4 fill-red-500/30 text-red-400" />
          <span className="text-xs md:text-sm">{post.likes}</span>
        </motion.button>
        
      </div>
    </motion.div>
  );
};

export default PostCard;

