import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';
import Topbar from '../navigation/Topbar';

interface MainLayoutProps {
  children?: React.ReactNode; // Make children optional
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex bg-gray-50 w-full h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300`}>
        {/* Top Navigation */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;