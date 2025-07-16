import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

export default function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row relative overflow-hidden">

      {/* Mobile hamburger toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="md:hidden absolute top-4 left-4 z-30 bg-white dark:bg-gray-800 shadow px-3 py-1 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className="hidden md:block">
        {/* Desktop sidebar — always visible */}
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 z-20 shadow-lg transition-transform">
          <Sidebar />
        </div>
      )}

      {/* Main chat area — always visible */}
      <div className="flex-1 overflow-hidden">
        <ChatArea />
      </div>
    </div>
  );
}
