
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar will be implemented later */}
        <div className="w-64 bg-sidebar-background h-screen">
          <nav className="p-4">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          </nav>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
