import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { sidebarEnter } from '../../animations/gsapHelpers';
import {
  LayoutDashboard,
  Pill,
  PlusCircle,
  BarChart2,
  User,
  LogOut,
  X,
  Users,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/medicines', icon: Pill, label: 'All Medicines' },
  { to: '/add-medicine', icon: PlusCircle, label: 'Add Medicine' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/caregivers', icon: Users, label: 'Caregivers' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useApp();
  const { logout } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarOpen) {
      sidebarEnter(sidebarRef.current);
    }
  }, [sidebarOpen]);

  // Close on route change on mobile
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-card-border dark:border-slate-800 shadow-sidebar dark:shadow-none
          flex flex-col transition-transform duration-300 ease-out transition-colors
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
        `}
        aria-label="Main navigation"
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-card-border dark:border-slate-800 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <div>
              <p className="font-bold text-text-primary dark:text-white text-sm leading-tight">Nexus</p>
              <p className="text-[10px] text-text-secondary dark:text-slate-400 leading-tight">Medication System</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1.5 rounded-lg text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider mb-3 px-3">
            Menu
          </p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom – logout */}
        <div className="p-4 border-t border-card-border dark:border-slate-800 transition-colors">
          <button
            onClick={logout}
            className="sidebar-link sidebar-link-inactive w-full text-status-missed hover:bg-red-50 hover:text-status-missed dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
            id="logout-btn"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
