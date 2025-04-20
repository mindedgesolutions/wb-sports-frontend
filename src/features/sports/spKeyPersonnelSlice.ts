import { createSlice } from '@reduxjs/toolkit';
import { KeyPersonnelProps } from '@/types/contents';

const initialState = {
  keyPersonnel: [] as KeyPersonnelProps[],
};

const spKeyPersonnelSlice = createSlice({
  name: 'spKeyPersonnel',
  initialState,
  reducers: {
    setKeyPersonnel: (state, action) => {
      state.keyPersonnel = action.payload;
    },
  },
});
export const { setKeyPersonnel } = spKeyPersonnelSlice.actions;
export default spKeyPersonnelSlice.reducer;
