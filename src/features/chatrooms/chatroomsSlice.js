import { createSlice } from '@reduxjs/toolkit';
import { fetchChatrooms, createChatroom, deleteChatroom } from './chatroomsThunks';

const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChatrooms.pending, state => { state.loading = true; })
      .addCase(fetchChatrooms.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(createChatroom.fulfilled, (state, { payload }) => {
        state.list.unshift(payload);
      })
      .addCase(deleteChatroom.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter(c => c.id !== id);
      });
  },
});

export default chatroomsSlice.reducer;
