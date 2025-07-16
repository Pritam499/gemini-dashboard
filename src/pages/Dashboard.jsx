import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Sidebar on desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile greeting */}
      <div className="block md:hidden text-center py-8 text-blue-600 text-xl font-semibold">
        Hello, Pritam 👋
      </div>

      {/* Main chat area (handles “no‑chat” and “in‑chat” states) */}
      <ChatArea />
    </div>
  );
}
