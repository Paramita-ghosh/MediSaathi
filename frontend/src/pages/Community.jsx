// import React, { useEffect, useState, useContext } from "react";
// import { getPosts, createPost, likePost } from "../api/communityAPI";
// import PostCard from "../components/Community/PostCard.jsx";
// import PostForm from "../components/Community/PostForm.jsx";
// import AuthContext from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Community = () => {
//   const [posts, setPosts] = useState([]);
//   const { user } = useContext(AuthContext);

//   const fetchPosts = async () => {
//     try {
//       const data = await getPosts();
//       setPosts(data);
//     } catch (error) {
//       toast.error("Failed to load posts");
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handlePostSubmit = async (postData) => {
//     try {
//       await createPost(postData, user?.token);
//       toast.success("Post added!");
//       fetchPosts();
//     } catch {
//       toast.error("Failed to add post");
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       await likePost(id, user?.token);
//       fetchPosts();
//     } catch {
//       toast.error("Failed to like post");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 font-serif">
//         🌿 Alchemist Community 🌟
//       </h1>
//       {user && <PostForm onSubmit={handlePostSubmit} />}
//       <div className="space-y-4">
//         {posts.map((post) => (
//           <PostCard key={post._id} post={post} onLike={handleLike} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Community;


import React, { useEffect, useState, useContext } from "react";
import { getPosts, createPost, likePost } from "../api/communityAPI";
import PostCard from "../components/Community/PostCard.jsx";
import PostForm from "../components/Community/PostForm.jsx";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (postData) => {
    try {
      await createPost(postData, user?.token);
      toast.success("✨ Post added to the Grimoire!");
      fetchPosts();
    } catch {
      toast.error("⚠️ Failed to inscribe your post.");
    }
  };

  const handleLike = async (id) => {
    try {
      await likePost(id, user?.token);
      fetchPosts();
    } catch {
      toast.error("Failed to enchant post ❤️");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#151520] to-[#1e1e2f] text-gray-200 font-serif px-3 py-6">
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✨ The Alchemist’s Grimoire 🌙
      </motion.h1>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 bg-[#1a1a27] mx-auto border border-purple-700/40 rounded-lg shadow-md shadow-purple-900/30 p-2 max-w-3xl"
        >
          <h2 className="text-lg font-semibold mb-3 text-purple-300">
            🪶 Compose a Spell 
          </h2>
          <PostForm onSubmit={handlePostSubmit} />
        </motion.div>
      )}

      <motion.div
        layout
        className="space-y-4 max-w-3xl mx-auto backdrop-blur-sm"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.35)",
              }}
              className="bg-[#171723] border border-purple-700/30 rounded-xl shadow-sm shadow-purple-900/30 hover:shadow-purple-700/40 transition-all duration-300 p-3"
            >
              <PostCard post={post} onLike={handleLike} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500 italic text-sm mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🌫️ No incantations yet... Be the first to write in the Grimoire.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Community;
