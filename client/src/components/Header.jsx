import React from "react";
import { MdSearch, MdLocalFireDepartment, MdNotifications } from "react-icons/md";

const Header = ({ user }) => {
  return (
    <header className="h-20 bg-white dark:bg-[#1A2632] border-b border-slate-100 dark:border-[#2A3B4D] flex items-center justify-between px-10 z-10 sticky top-0 shadow-sm">
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track your daily language journey</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-[#2A3B4D] rounded-full px-4 py-2 border border-transparent focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <MdSearch className="text-slate-400 text-[20px]" />
          <input
            className="bg-transparent border-none text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:ring-0 w-64"
            placeholder="Search lessons..."
          />
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

        {/* Streak */}
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-800 shadow-sm">
          <MdLocalFireDepartment className="text-orange-500 text-[20px]" />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-orange-700 dark:text-orange-400">
              {user.streak} Day Streak
            </span>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-[#2A3B4D] text-slate-500 dark:text-[#94a3b8] transition-colors">
          <MdNotifications className="text-[20px]" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1A2632]"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
