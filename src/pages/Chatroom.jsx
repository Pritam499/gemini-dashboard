// import React, { useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   loadPage,
//   loadOlder,
//   sendMessage,
//   aiReply
// } from '../features/messages/messagesThunks';
// import useInfiniteScroll from '../hooks/useInfiniteScroll';
// import useTypingIndicator from '../hooks/useTypingIndicator';
// import ChatList from '../components/ChatList';
// import LoadingSkeleton from '../components/LoadingSkeleton';

// export default function Chatroom() {
//   const { id: chatroomId } = useParams();
//   const dispatch = useDispatch();
//   const { byPage, currentPage, loadingOlder, typing } = useSelector(s => s.messages);
//   const scrollRef = useRef();

//   useEffect(() => {
//     dispatch(loadPage({ chatroomId, page: 1 }));
//   }, [dispatch, chatroomId]);

//   useInfiniteScroll(scrollRef, () => {
//     if (currentPage < 5 && !loadingOlder) {
//       dispatch(loadOlder({ chatroomId, page: currentPage + 1 }));
//     }
//   });

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (el) el.scrollTop = el.scrollHeight;
//   }, [byPage[currentPage]?.length, typing]);

//   const allMessages = Object.values(byPage)
//     .flat()
//     .sort((a, b) => a.timestamp - b.timestamp);

//   const handleSend = (text, file) => {
//     dispatch(sendMessage({ chatroomId, text, image: file })).then(action => {
//       if (action.payload) {
//         dispatch(aiReply({ chatroomId, lastUserMsg: action.payload }));
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
//       {/* Messages */}
//       <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-2">
//         {loadingOlder && <LoadingSkeleton count={5} />}
//         <ChatList messages={allMessages} />
//         {typing && <p className="italic text-gray-600">Gemini is typing...</p>}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPage,
  loadOlder,
  sendMessage,
  aiReply
} from '../features/messages/messagesThunks';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useTypingIndicator from '../hooks/useTypingIndicator';
import ChatList from '../components/ChatList';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Chatroom() {
  const { id: chatroomId } = useParams();
  const dispatch = useDispatch();
  const { byPage, currentPage, loadingOlder, typing } = useSelector(s => s.messages);
  const scrollRef = useRef();

  // on mount, load messages AND restore last image
  useEffect(() => {
    dispatch(loadPage({ chatroomId, page: 1 }));

    const lastImage = localStorage.getItem(`chat-${chatroomId}-lastImage`);
    if (lastImage) {
      // directly inject it as the only message on page 1
      dispatch(sendMessage.fulfilled(
        {
          id: `restored-${Date.now()}`,
          text: '',
          image: lastImage,
          sender: 'user',
          timestamp: Date.now()
        },
        '',
        { chatroomId, text: '', image: lastImage }
      ));
    }
  }, [dispatch, chatroomId]);

  useInfiniteScroll(scrollRef, () => {
    if (currentPage < 5 && !loadingOlder) {
      dispatch(loadOlder({ chatroomId, page: currentPage + 1 }));
    }
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [byPage[currentPage]?.length, typing]);

  const allMessages = Object.values(byPage)
    .flat()
    .sort((a, b) => a.timestamp - b.timestamp);

  const handleSend = (text, image) => {
    if (image) {
      localStorage.setItem(`chat-${chatroomId}-lastImage`, image);
    }
    dispatch(sendMessage({ chatroomId, text, image })).then(action => {
      if (action.payload) {
        dispatch(aiReply({ chatroomId, lastUserMsg: action.payload }));
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-2">
        {loadingOlder && <LoadingSkeleton count={5} />}
        <ChatList messages={allMessages} />
        {typing && <p className="italic text-gray-600">Gemini is typing...</p>}
      </div>

      {/* input flows are handled up in ChatArea */}
    </div>
  );
}
