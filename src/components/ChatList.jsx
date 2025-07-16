import React from 'react';
import ChatBubble from './ChatBubble';

export default function ChatList({ messages }) {
  return (
    <div className="flex flex-col space-y-2">
      {messages.map(msg => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
