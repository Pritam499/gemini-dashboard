import { createAsyncThunk } from '@reduxjs/toolkit';

let nextId = 1;

// simulate fetching chatrooms
export const fetchChatrooms = createAsyncThunk(
  'chatrooms/fetchChatrooms',
  async () => {
    await new Promise(r => setTimeout(r, 500));
    return []; // or load from localStorage
  }
);

// simulate creating a chatroom
export const createChatroom = createAsyncThunk(
  'chatrooms/createChatroom',
  async (title) => {
    await new Promise(r => setTimeout(r, 300));
    return { id: nextId++, title, createdAt: Date.now() };
  }
);

// simulate deleting a chatroom
export const deleteChatroom = createAsyncThunk(
  'chatrooms/deleteChatroom',
  async (id) => {
    await new Promise(r => setTimeout(r, 200));
    return id;
  }
);
