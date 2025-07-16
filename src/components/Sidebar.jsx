// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`
        h-screen                /* full viewport height */
        sticky top-0            /* stick to top on scroll */
        flex flex-col justify-between
        ${collapsed ? 'w-14' : 'w-64'}
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        p-4
        z-10
      `}
    >
      {/* Hamburger toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-gray-600 dark:text-gray-200 mb-4 focus:outline-none"
      >
        <FiMenu size={20} />
      </button>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto">
        {!collapsed && (
          <>
            <p className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Recent Chats
            </p>
            <ul className="space-y-1">
              <li className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-200">
                Chatroom 1
              </li>
              <li className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-200">
                Chatroom 2
              </li>
              {/* Add more items here */}
            </ul>
          </>
        )}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center space-x-2 mt-4 focus:outline-none text-gray-600 dark:text-gray-200"
      >
        {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
        {!collapsed && <span className="text-sm">{dark ? 'Light Mode' : 'Dark Mode'}</span>}
      </button>
    </div>
  );
}
