import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://644810f17bb84f5a3e516a67.mockapi.io';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async ({ page, abortController }, thunkAPI) => {
    try {
      const { data } = await axios.get('/users', {
        signal: abortController.signal,
        params: { page, limit: 3 },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
