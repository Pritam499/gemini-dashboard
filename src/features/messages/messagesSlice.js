// import { createSlice } from '@reduxjs/toolkit';
// import { loadPage, loadOlder, sendMessage, aiReply } from './messagesThunks';

// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState: {
//     byPage: {},    // { pageNum: [msg,...] }
//     currentPage: 1,
//     pageSize: 20,
//     loading: false,
//     loadingOlder: false,
//     typing: false,
//   },
//   reducers: {
//     resetMessages(state) {
//       state.byPage = {};
//       state.currentPage = 1;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(loadPage.pending, state => { state.loading = true; })
//       .addCase(loadPage.fulfilled, (state, { payload: { page, messages } }) => {
//         state.byPage[page] = messages;
//         state.loading = false;
//       })
//       .addCase(loadOlder.pending, state => { state.loadingOlder = true; })
//       .addCase(loadOlder.fulfilled, (state, { payload: { page, messages } }) => {
//         state.byPage[page] = messages;
//         state.loadingOlder = false;
//       })
//       .addCase(sendMessage.fulfilled, (state, { payload }) => {
//         const p = state.currentPage;
//         state.byPage[p] = [...(state.byPage[p]||[]), payload];
//       })
//       .addCase(aiReply.pending, state => { state.typing = true; })
//       .addCase(aiReply.fulfilled, (state, { payload }) => {
//         const p = state.currentPage;
//         state.byPage[p] = [...(state.byPage[p]||[]), payload];
//         state.typing = false;
//       });
//   },
// });

// export const { resetMessages } = messagesSlice.actions;
// export default messagesSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';
import { loadPage, loadOlder, sendMessage, aiReply } from './messagesThunks';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byPage: {},    
    currentPage: 1,
    pageSize: 20,
    loading: false,
    loadingOlder: false,
    typing: false,
  },
  reducers: {
    resetMessages(state) {
      state.byPage = {};
      state.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      // ... your existing loadPage / loadOlder / aiReply ...

      // 1️⃣ When sendMessage starts, add a “loading” placeholder
      .addCase(sendMessage.pending, (state, action) => {
        const { chatroomId, text, image } = action.meta.arg;
        const p = state.currentPage;
        state.byPage[p] = state.byPage[p] || [];
        state.byPage[p].push({
          id: `pending-${Date.now()}`,
          text,
          image,
          sender: 'user',
          timestamp: Date.now(),
          loading: true,            // mark as loading
        });
      })

      // 2️⃣ When it fulfills, replace that placeholder with the real msg
      .addCase(sendMessage.fulfilled, (state, action) => {
        const p = state.currentPage;
        const messages = state.byPage[p] || [];
        const idx = messages.findIndex(m => m.loading);
        if (idx !== -1) {
          messages[idx] = { ...action.payload, loading: false };
        } else {
          messages.push(action.payload);
        }
      })

      // leave aiReply, etc.
  },
});

export const { resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
