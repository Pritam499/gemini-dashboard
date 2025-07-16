import { createSlice } from '@reduxjs/toolkit';
import { sendOtp, verifyOtp } from './authThunks';

const initialState = {
  countryCode: '+1',
  phone: '',
  otpSent: false,
  verifying: false,
  verified: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCountryCode(state, action) {
      state.countryCode = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => { state.loading = true; })
      .addCase(sendOtp.fulfilled, state => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, state => { state.loading = false; })
      .addCase(verifyOtp.pending, state => {
        state.verifying = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifying = false;
        state.verified = action.payload === true;
      })
      .addCase(verifyOtp.rejected, state => {
        state.verifying = false;
      });
  },
});

export const { setCountryCode, setPhone, resetAuth } = authSlice.actions;
export default authSlice.reducer;
