import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
