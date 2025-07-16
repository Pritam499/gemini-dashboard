// src/components/DarkModeToggle.jsx
'use client'; // if using Next.js; you can omit this in CRA

import React, { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function DarkModeToggle() {
  const [dark, setDark] = useLocalStorage('dark-mode', false);

  // On mount/update, toggle the `dark` class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
