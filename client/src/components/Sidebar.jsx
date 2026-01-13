
import React from "react";
import {
  MdDashboard,
  MdStyle,
  MdMenuBook,
  MdEditNote,
  MdBarChart,
  MdSettings,
  MdHelp,
  MdSchool,
} from "react-icons/md";
import { useLocation } from "react-router-dom";


const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Vocabulary", icon: <MdStyle />, path: "/vocabulary" },
    { name: "Reading", icon: <MdMenuBook />, path: "/reading" },
    { name: "Writing", icon: <MdEditNote />, path: "/writing" },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-[#1A2632] border-r border-slate-200 dark:border-[#2A3B4D] flex flex-col h-full flex-shrink-0 z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <MdSchool size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          LingoTrack
        </h1>
      </div>
      <nav className="flex-1 px-6 flex flex-col gap-2 overflow-y-auto no-scrollbar">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <a
              key={item.name}
              href={item.path}
              className={`sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium ${
                isActive
                  ? "text-blue-500 bg-blue-50"
                  : "text-slate-500 dark:text-[#94a3b8] hover:bg-slate-50 dark:hover:bg-[#2A3B4D] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
