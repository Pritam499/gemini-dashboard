import React from 'react';

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse my-2"
        />
      ))}
    </>
  );
}
