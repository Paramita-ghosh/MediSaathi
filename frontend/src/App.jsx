import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Toaster is no longer needed here
// AuthProvider is no longer needed here
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import PrivateRoute from './components/Layout/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';
import Community from './pages/Community';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    // AuthProvider and Toaster have been moved to main.jsx
    // This component now just renders the application's routes
    <Routes>
      {/* Public routes (no navbar) */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes (with Navbar) */}
      <Route 
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Community />} />
      </Route>
    </Routes>
  );
}

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import WelcomePage from './pages/WelcomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import SchedulePage from './pages/SchedulePage';
// import CalendarSuccessPage from './pages/CalendarSuccessPage'; // --- NEW ---
// import PrivateRoute from './components/Layout/PrivateRoute';
// import MainLayout from './components/Layout/MainLayout';

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<WelcomePage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* Protected Routes */}
//       <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <MainLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route path="dashboard" element={<DashboardPage />} />
//         <Route path="schedule" element={<SchedulePage />} />
//         <Route path="calendar-success" element={<CalendarSuccessPage />} /> {/* --- NEW --- */}
//       </Route>
//     </Routes>
//   );
// }

// export default App;



