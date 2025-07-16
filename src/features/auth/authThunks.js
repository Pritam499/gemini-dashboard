// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (_, thunkAPI) => {
    const { auth: { countryCode, phone } } = thunkAPI.getState();
    await new Promise(r => setTimeout(r, 1000));
    console.log(`📱 OTP sent to ${countryCode}${phone}`);
    return true;
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (enteredOtp, thunkAPI) => {
    await new Promise(r => setTimeout(r, 800));
    return enteredOtp === '123456'; // Accept this OTP
  }
);
