// import React, { useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import AuthContext from '../../context/AuthContext';
// import { GiCauldron } from 'react-icons/gi';
// import { FiLogOut, FiLayout, FiCalendar } from 'react-icons/fi';

// const Navbar = () => {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     const linkStyle = "flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-border-color transition-colors";
//     const activeLinkStyle = "bg-border-color text-text-primary";

//     return (
//         <motion.nav 
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className="bg-secondary p-4 flex flex-wrap justify-between items-center gap-4 border-b border-border-color shadow-lg"
//         >
//             {/* Logo and Brand */}
//             <div className="flex items-center gap-3">
//                 <GiCauldron className="text-accent text-3xl" />
//                 <span className="text-2xl font-serif text-text-primary">MediSaathi</span>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex items-center gap-4">
//                 <NavLink 
//                     to="/dashboard" 
//                     className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
//                 >
//                     <FiLayout />
//                     <span>Dashboard</span>
//                 </NavLink>
//                 <NavLink 
//                     to="/schedule" 
//                     className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
//                 >
//                     <FiCalendar />
//                     <span>Schedule</span>
//                 </NavLink>
//             </div>

//             {/* User Info & Logout */}
//             <div className="flex items-center gap-4">
//                 <span className="text-text-secondary hidden sm:block">Welcome, {user?.name}!</span>
//                 <button 
//                     onClick={handleLogout} 
//                     className="flex items-center gap-2 bg-primary text-text-secondary px-4 py-2 rounded-lg hover:bg-border-color hover:text-text-primary transition-colors"
//                 >
//                     <FiLogOut />
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </motion.nav>
//     );
// };

// export default Navbar;


import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import { GiCauldron } from 'react-icons/gi';
import { FiLogOut, FiLayout, FiCalendar, FiUsers, FiInfo } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const linkStyle = "flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:text-glow-purple hover:shadow-[0_0_10px_rgba(180,100,255,0.8)] transition-all duration-300";
    const activeLinkStyle = "bg-[rgba(180,100,255,0.15)] text-glow-purple shadow-[0_0_15px_rgba(180,100,255,0.5)]";

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative bg-linear-to-r from-[#0a0a0f] via-[#141422] to-[#0a0a0f] p-4 flex flex-wrap justify-between items-center gap-4 border-b border-purple-500/30 shadow-[0_0_30px_rgba(150,50,255,0.3)] backdrop-blur-xl overflow-hidden"
        >
            {/* Magical glow animation background */}
            <div className="absolute inset-0 opacity-30 animate-pulse bg-[radial-gradient(circle_at_30%_30%,rgba(150,50,255,0.4),transparent_70%)]"></div>

            {/* Logo and Brand */}
            <div className="flex items-center gap-3 z-10">
                <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                    <GiCauldron className="text-glow-purple text-3xl drop-shadow-[0_0_10px_rgba(180,100,255,0.8)]" />
                </motion.div>
                <span className="text-2xl font-mystic text-glow-purple tracking-wide drop-shadow-[0_0_10px_rgba(180,100,255,0.7)]">
                    MediSaathi
                </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-4 z-10">
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
                >
                    <FiLayout />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink 
                    to="/schedule" 
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
                >
                    <FiCalendar />
                    <span>Schedule</span>
                </NavLink>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
                >
                    <FiInfo />
                    <span>About</span>
                </NavLink>
                <NavLink 
                    to="/community" 
                    className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ""}`}
                >
                    <FiUsers />
                    <span>Community</span>
                </NavLink>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4 z-10">
                <span className="text-text-secondary hidden sm:block italic text-sm opacity-80">
                    Welcome, {user?.name}!
                </span>
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(180,100,255,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout} 
                    className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(180,100,255,0.8)]"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </motion.button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
