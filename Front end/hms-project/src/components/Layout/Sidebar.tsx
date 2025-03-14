import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, FileText, Pill, CreditCard, FlaskRound as Flask, Bell, Settings, LogOut, UserCircle, ClipboardList, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell size={20} /> },
      { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { name: 'Doctors', path: '/doctors', icon: <Users size={20} /> },
        { name: 'Patients', path: '/patients', icon: <UserCircle size={20} /> },
        { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
        { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
      ];
    }

    if (user?.role === 'doctor') {
      return [
        ...commonItems,
        { name: 'My Patients', path: '/my-patients', icon: <UserCircle size={20} /> },
        { name: 'Medical Records', path: '/medical-records', icon: <ClipboardList size={20} /> },
        { name: 'Prescriptions', path: '/prescriptions', icon: <Pill size={20} /> },
        { name: 'Lab Reports', path: '/lab-reports', icon: <Flask size={20} /> },
      ];
    }

    if (user?.role === 'patient') {
      return [
        ...commonItems,
        { name: 'Medical Records', path: '/medical-records', icon: <ClipboardList size={20} /> },
        { name: 'Prescriptions', path: '/prescriptions', icon: <Pill size={20} /> },
        { name: 'Lab Reports', path: '/lab-reports', icon: <Flask size={20} /> },
        { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
        { name: 'Vitals', path: '/vitals', icon: <Activity size={20} /> },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-600 flex items-center">
          <Activity className="mr-2" size={24} />
          MediCare
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={user.name}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs font-medium text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;