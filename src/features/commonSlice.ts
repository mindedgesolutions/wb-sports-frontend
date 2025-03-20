import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spCounter: 0,
  srCounter: 0,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateSpCounter: (state) => {
      state.spCounter += 1;
    },
    updateSrCounter: (state) => {
      state.srCounter += 1;
    },
  },
});
export const { updateSpCounter, updateSrCounter } = commonSlice.actions;
export default commonSlice.reducer;
