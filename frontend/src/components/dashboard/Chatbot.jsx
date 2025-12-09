// import React, { useState, useRef, useEffect, useContext } from 'react'; // Import useContext
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, User, Bot, Loader2 } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import AuthContext from '../../context/AuthContext'; // Import AuthContext

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: 'model',
//       content:
//         'Hello! I am your Alchemist assistant. How can I help you with your medication schedule today?',
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);
//   const { user } = useContext(AuthContext); // Get the user from context

//   // Scroll to bottom effect
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // Create a config object to send the token
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`, // Add the token here
//         },
//       };

//       // Send prompt to our backend (which uses the proxy)
//       const { data } = await axios.post('/api/chat/generate', { prompt: input }, config); // Pass config

//       const aiMessage = { role: 'model', content: data.response };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || 'Failed to get response from AI.'
//       );
//       // If error, remove the user's last message to let them retry
//       setMessages((prev) => prev.slice(0, prev.length - 1));
//       setInput(userMessage.content); // Put their message back in the input
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.4 }}
//       className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 flex flex-col h-120 w-full max-w-2xl"
//     >
//       {/* Header */}
//       <div className="p-4 border-b border-gray-300">
//         <h3 className="text-xl font-serif font-bold text-gray-900 text-center">
//           Alchemist's Assistant
//         </h3>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-4">
//         <AnimatePresence>
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className={`flex items-start gap-3 ${
//                 msg.role === 'user' ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               {msg.role === 'model' && (
//                 <div className="w-8 h-8 rounded-full bg-accent shrink-0 flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//               )}
//               <div
//                 className={`max-w-xs md:max-w-md p-3 rounded-xl ${
//                   msg.role === 'user'
//                     ? 'bg-accent text-white rounded-br-none'
//                     : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                 }`}
//               >
//                 {msg.content}
//               </div>
//               {msg.role === 'user' && (
//                 <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0 flex items-center justify-center">
//                   <User className="w-5 h-5 text-gray-700" />
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-start items-center gap-3"
//           >
//             <div className="w-8 h-8 rounded-full bg-accent shrink-0 flex items-center justify-center">
//               <Loader2 className="w-5 h-5 text-white animate-spin" />
//             </div>
//             <div className="max-w-xs p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none italic">
//               Alchemist is thinking...
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Form */}
//       <div className="p-4 border-t border-gray-300 bg-white/50 rounded-b-xl">
//         <form onSubmit={handleSubmit} className="flex items-center gap-3">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about your schedule..."
//             disabled={isLoading}
//             className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-gray-400"
//           />
//           <motion.button
//             type="submit"
//             disabled={isLoading}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-5 rounded-lg shadow-lg transition-colors duration-300 disabled:opacity-50"
//           >
//             <Send className="w-5 h-5" />
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Chatbot;


import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthContext from '../../context/AuthContext';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content:
        '🌙 Greetings, seeker! I am your Alchemist assistant. How may I guide you through your potion schedules today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post('/api/chat/generate', { prompt: input }, config);
      const aiMessage = { role: 'model', content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to get response from the AI.');
      setMessages((prev) => prev.slice(0, -1));
      setInput(userMessage.content);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-linear-to-br from-[#0d0d14] via-[#141425] to-[#1d1d30] 
                 text-gray-100 font-serif rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.25)]
                 border border-purple-800/40 flex flex-col h-120 w-full max-w-2xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-700/40 bg-[#1a1a2b] rounded-t-2xl">
        <h3 className="text-2xl font-bold text-center bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-md">
          ✨ Alchemist’s Assistant 🔮
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-800/50">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-800/50">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  msg.role === 'user'
                    ? 'bg-linear-to-br from-purple-600 to-pink-500 text-white rounded-br-none shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-[#23233a]/60 border border-purple-700/30 text-gray-100 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shadow-md shadow-black/40">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-600 to-cyan-500 flex items-center justify-center animate-pulse">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <div className="max-w-xs p-3 rounded-lg bg-[#23233a]/60 border border-purple-700/30 italic text-gray-300">
              ✨ Alchemist is conjuring your response...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-purple-700/40 bg-[#1a1a2b] rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your magical query..."
            disabled={isLoading}
            className="flex-1 bg-[#10101a] border border-purple-700/50 text-gray-100 rounded-lg py-2.5 px-4 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/60 placeholder:text-gray-400 shadow-inner"
          />
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(168,85,247,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-purple-600 via-pink-500 to-cyan-500 text-white font-bold py-2.5 px-5 rounded-lg
                       shadow-[0_0_10px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatbot;
