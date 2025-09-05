import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Search, Plus, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../context/authStore';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout } = useAuthStore();
  
  return (
    <div className="flex justify-between items-center bg-white p-4 border-gray-200 border-b h-16">
      {/* Left Side: Sidebar Toggle, Dashboard Title and Welcome Message */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 p-2 focus:outline-none text-gray-500 hover:text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-bold text-gray-800 text-xl">Tableau de bord</h2>
          <p className="text-gray-500 text-sm">Bienvenue ! Voici ce qui se passe avec votre entreprise aujourd'hui.</p>
        </div>
      </div>

      {/* Right Side: Search, Quick Add, Notifications, User Menu */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <button className="p-2 focus:outline-none text-gray-400 hover:text-gray-600">
          <Search className="w-6 h-6" />
        </button>

        {/* Quick Add */}
        <div className="relative">
          <button className="flex items-center p-2 focus:outline-none text-gray-400 hover:text-gray-600">
            <Plus className="mr-1 w-6 h-6" />
            Ajout rapide
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          {/* Dropdown for Quick Add (Order, Expense, Stock entry) - Placeholder */}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 focus:outline-none text-gray-400 hover:text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="inline-flex top-0 right-0 absolute justify-center items-center bg-error-red rounded-full w-5 h-5 font-bold text-white text-xs">3</span>
          </button>
          {/* Dropdown for Notifications (low stock, unpaid invoice) - Placeholder */}
        </div>

        {/* User menu */}
        <div className="relative">
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 focus:outline-none">
            <div className="flex justify-center items-center bg-primary-cyan rounded-full w-9 h-9 font-bold text-white text-sm">
              JD
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">John Doe</h3>
              <p className="text-gray-500 text-xs">Administrateur</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showUserMenu && (
            <div className="right-0 z-10 absolute bg-white shadow-lg mt-2 py-1 rounded-md w-48">
              <a href="#" className="flex items-center hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm">
                <User className="mr-2 w-4 h-4" />
                Profile
              </a>
              <button onClick={logout} className="flex items-center hover:bg-gray-100 px-4 py-2 w-full text-gray-700 text-sm text-left">
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;