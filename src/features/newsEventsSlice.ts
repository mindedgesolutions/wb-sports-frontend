import { createSlice } from '@reduxjs/toolkit';
import { NewsEventsProps } from '../types/contents';

const initialState = {
  newsEvents: [] as NewsEventsProps[] | null,
  newsEventsAll: [] as NewsEventsProps[] | null,
};

const newsEventsSlice = createSlice({
  initialState,
  name: 'newsEvents',
  reducers: {
    setNewsEvents: (state, action) => {
      state.newsEvents = action.payload;
    },
    setNewsEventsAll: (state, action) => {
      state.newsEventsAll = action.payload;
    },
  },
});
export const { setNewsEvents, setNewsEventsAll } = newsEventsSlice.actions;
export default newsEventsSlice.reducer;
