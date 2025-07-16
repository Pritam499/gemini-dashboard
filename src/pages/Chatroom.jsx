import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPage,
  loadOlder,
  sendMessage
} from '../features/messages/messagesThunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ChatList from '../components/ChatList';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Chatroom() {
  const { id: chatroomId } = useParams();
  const dispatch = useDispatch();
  const { byPage, currentPage, loadingOlder, typing } = useSelector(s => s.messages);
  const scrollRef = useRef();

  // ⬇️ useEffect to load page + restore image
  useEffect(() => {
  const payload = { chatroomId, page: 1 };
  dispatch(loadPage(payload));

  const lastImage = localStorage.getItem(`chat-${chatroomId}-lastImage`);
  if (lastImage) {
    const restoredMessage = {
      id: `restored-${Date.now()}`,
      text: '',
      image: lastImage,
      sender: 'user',
      timestamp: Date.now()
    };
    dispatch(sendMessage.fulfilled(
      restoredMessage,
      '',
      { chatroomId, text: '', image: lastImage }
    ));
  }
}, [chatroomId, dispatch]); // ✅ include dispatch

  // ⬇️ Infinite scroll to load older pages
  useInfiniteScroll(scrollRef, () => {
    if (currentPage < 5 && !loadingOlder) {
      const payload = { chatroomId, page: currentPage + 1 };
      dispatch(loadOlder(payload));
    }
  });

  // ⬇️ Auto-scroll to latest
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [byPage[currentPage]?.length, typing]);

  const allMessages = Object.values(byPage)
    .flat()
    .sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-2">
        {loadingOlder && <LoadingSkeleton count={5} />}
        <ChatList messages={allMessages} />
        {typing && <p className="italic text-gray-600">Gemini is typing...</p>}
      </div>
    </div>
  );
}
