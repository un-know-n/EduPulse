import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
