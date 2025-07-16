import { createAsyncThunk } from '@reduxjs/toolkit';

// simulate loading a page of messages
export const loadPage = createAsyncThunk(
  'messages/loadPage',
  async ({ chatroomId, page }, thunkAPI) => {
    await new Promise(r => setTimeout(r, 500));
    // generate dummy messages
    const messages = Array.from({ length: 20 }, (_, i) => ({
      id: `${chatroomId}-${page}-${i}`,
      text: `Message ${i+1} of page ${page}`,
      sender: i % 2 === 0 ? 'user' : 'ai',
      timestamp: Date.now() - (20 - i) * 60000,
    }));
    return { page, messages };
  }
);

// load older page (page-1)
export const loadOlder = createAsyncThunk(
  'messages/loadOlder',
  async (args, thunkAPI) => {
    const { chatroomId, page } = args;
    return thunkAPI.dispatch(loadPage({ chatroomId, page }));
  }
);

// simulate sending a user message
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ chatroomId, text, image }) => {
    await new Promise(r => setTimeout(r, 100));
    return { id: Date.now().toString(), text, image, sender: 'user', timestamp: Date.now() };
  }
);

// simulate AI reply
export const aiReply = createAsyncThunk(
  'messages/aiReply',
  async ({ chatroomId, lastUserMsg }, thunkAPI) => {
    await new Promise(r => setTimeout(r, 1500));
    return {
      id: `ai-${Date.now()}`,
      text: `Echo: ${lastUserMsg.text}`,
      sender: 'ai',
      timestamp: Date.now(),
    };
  }
);
