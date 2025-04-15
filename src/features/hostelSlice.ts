import { createSlice } from '@reduxjs/toolkit';
import { YouthHostelProps } from '@/types/contents';

const initialState = {
  hostels: [] as YouthHostelProps[],
};

const hostelSlice = createSlice({
  name: 'hostel',
  initialState,
  reducers: {
    setHostels: (state, action) => {
      state.hostels = action.payload;
    },
  },
});
export const { setHostels } = hostelSlice.actions;
export default hostelSlice.reducer;
