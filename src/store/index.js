import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatroomsReducer from '../features/chatrooms/chatroomsSlice';
import messagesReducer from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatrooms: chatroomsReducer,
    messages: messagesReducer,
  },
});

export default store;
