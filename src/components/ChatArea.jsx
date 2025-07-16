// src/components/ChatArea.jsx
import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import ChatInput from './ChatInput';
import { useDispatch } from 'react-redux';
import { sendMessage, aiReply } from '../features/messages/messagesThunks';

export default function ChatArea() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSend = (text, file) => {
    if (!id) return;
    dispatch(sendMessage({ chatroomId: id, text, image: file }))
      .then(a => a.payload && dispatch(aiReply({ chatroomId: id, lastUserMsg: a.payload })));
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-screen overflow-hidden bg-white dark:bg-gray-900">
      {!id ? (
        // GREETING + input, pushed down to ~1/3 from bottom
        <div className="flex-1 flex flex-col items-center justify-end ">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4 pb-[30%]">
            Hello, Pritam
          </h1>
          <div className="w-full max-w-3xl px-4 pb-[10vh]">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      ) : (
        // REAL CHATROOM
        <div className="flex flex-col justify-between h-full w-full max-w-3xl mx-auto">
          <Outlet />

          {/* Desktop input */}
          <div className="hidden md:flex justify-center w-full px-4 pb-4">
            <div className="w-full">
              <ChatInput onSend={handleSend} />
            </div>
          </div>

          {/* Mobile input */}
          <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden z-50">
            <div className="w-full max-w-xl mx-auto">
              <ChatInput onSend={handleSend} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
