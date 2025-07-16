// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Chatroom from './pages/Chatroom';
import './index.css';

export default function App() {
  return (
      <main className="h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-800">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* Protected */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="chat/:id" element={<Chatroom />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
  );
}
