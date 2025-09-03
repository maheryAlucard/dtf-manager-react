import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 border-gray-200 border-b h-16">
      {/* Left Side: Dashboard Title and Welcome Message */}
      <div>
        <h2 className="font-bold text-gray-800 text-xl">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Right Side: Notifications and User Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 focus:outline-none text-gray-400 hover:text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="inline-flex top-0 right-0 absolute justify-center items-center bg-error-red rounded-full w-5 h-5 font-bold text-white text-xs">3</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center bg-primary-cyan rounded-full w-9 h-9 font-bold text-white text-sm">
            JD
          </div>
          <div className="text-sm">
            <h3 className="font-medium text-gray-800">John Doe</h3>
            <p className="text-gray-500 text-xs">Administrator</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;