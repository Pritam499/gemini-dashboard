// import React from 'react';
// import { copyToClipboard } from '../utils/clipboard';
// import { formatTime } from '../utils/formatDate';

// export default function ChatBubble({ message }) {
//   const { text, sender, timestamp } = message;
//   const isUser = sender === 'user';

//   return (
//     <div
//       onMouseEnter={() => copyToClipboard(text)}
//       className={`max-w-xs p-2 rounded ${
//         isUser ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
//       }`}
//     >
//       <p>{text}</p>
//       <span className="text-xs text-gray-600">{formatTime(timestamp)}</span>
//     </div>
//   );
// }





// src/components/ChatBubble.jsx
import React from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { formatTime } from '../utils/formatDate';

export default function ChatBubble({ message }) {
  const isUser = message.sender === 'user';

  // 3️⃣ If loading, show a pulse block
  if (message.loading) {
    return (
      <div className={`max-w-xs p-2 rounded ${isUser ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => message.text && copyToClipboard(message.text)}
      className={`max-w-xs p-2 rounded ${isUser ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
    >
      {message.image ? (
        <img src={message.image} alt="upload" className="rounded mb-1 max-w-full" />
      ) : (
        <p>{message.text}</p>
      )}
      <span className="text-xs text-gray-600">{formatTime(message.timestamp)}</span>
    </div>
  );
}
