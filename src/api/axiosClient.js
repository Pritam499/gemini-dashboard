import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '/',        // adjust if you proxy in package.json
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});