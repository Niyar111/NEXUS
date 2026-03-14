import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, Bell, Search, ChevronDown, Sun, Moon } from 'lucide-react';
import { getInitials } from '../../utils/helpers';

const Navbar = () => {
  const { toggleSidebar } = useApp();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-card-border dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left – hamburger + brand */}
        <div className="flex items-center gap-3">
          <button
            id="sidebar-toggle"
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="font-bold text-text-primary dark:text-white text-lg hidden sm:block">
              Nexus
            </span>
          </div>
        </div>

        {/* Center – search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-card-border dark:border-slate-700/50 rounded-xl px-3 py-2 w-64 lg:w-80 transition-colors">
          <Search size={15} className="text-text-secondary dark:text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="bg-transparent text-sm text-text-primary dark:text-white placeholder-text-secondary dark:placeholder-slate-500 outline-none w-full"
            aria-label="Search medicines"
          />
        </div>

        {/* Right – notifications + avatar */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-text-secondary dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="relative p-2 rounded-xl text-text-secondary dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-pending rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-card-border dark:border-slate-800 ml-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {getInitials(user?.name)}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-text-primary dark:text-white leading-tight">{user?.name}</p>
              <p className="text-xs text-text-secondary dark:text-slate-400 leading-tight">{user?.email}</p>
            </div>
            <ChevronDown size={14} className="text-text-secondary dark:text-slate-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
