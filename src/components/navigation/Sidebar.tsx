import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  Users,
  BarChart2,
  DollarSign,
  BellRing,
  FileText,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navigationItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Commandes', icon: ShoppingCart, path: '/dashboard/orders', badge: 23 },
    { name: 'Inventaire', icon: Package, path: '/dashboard/stock', badge: 8 },
    { name: 'Clients', icon: Users, path: '/dashboard/clients' },
    { name: 'Factures', icon: FileText, path: '/dashboard/invoices' },
    { name: 'Dépenses', icon: DollarSign, path: '/dashboard/expenses' },
    { name: 'Revenus', icon: TrendingUp, path: '/dashboard/revenues' },
    { name: 'Rapports', icon: BarChart2, path: '/dashboard/reports/financial' },
    { name: 'Paramètres', icon: Settings, path: '/dashboard/settings/company' },
  ];

  return (
    <div className={`flex flex-col bg-[#111827] bg-dark-gray-800 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo and Brand */}
      <div className={`flex items-center p-4 border-dark-gray-700 border-b h-16 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-primary-cyan mr-3 p-2 rounded-lg">
          <BellRing className="w-6 h-6 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="font-bold text-white text-xl">DTF Manager</h1>
            <p className="text-gray-400 text-xs">Production Suite</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-2 py-4">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-dark-gray-700 hover:text-white
              ${isActive(item.path) ? 'bg-primary-cyan text-white' : ''} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className={`${isCollapsed ? 'mr-0' : 'mr-3'} w-5 h-5`} />
            {!isCollapsed && <span>{item.name}</span>}
            {item.badge && !isCollapsed && (
              <span className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full
                ${item.name === 'Commandes' ? 'bg-highlight-yellow text-dark-gray-900' : 'bg-error-red text-white'}`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* System Status */}
      <div className={`p-4 border-dark-gray-700 border-t ${isCollapsed ? 'justify-center' : ''}`}>
        <div className={`flex items-center text-gray-400 text-sm ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="bg-success-lime mr-2 rounded-full w-3 h-3"></div>
          {!isCollapsed && (
            <div>
              <p className="text-white">Système opérationnel</p>
              <p className="text-gray-500 text-xs">Dernière sauvegarde: 2 heures</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;