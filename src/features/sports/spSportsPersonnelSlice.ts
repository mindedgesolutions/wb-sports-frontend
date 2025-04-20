import { createSlice } from '@reduxjs/toolkit';
import { SportsPersonnelProps } from '@/types/contents';

const initialState = {
  sportsPersonnel: [] as SportsPersonnelProps[],
};

const spSportsPersonnelSlice = createSlice({
  name: 'spSportsPersonnel',
  initialState,
  reducers: {
    setSportsPersonnel: (state, action) => {
      state.sportsPersonnel = action.payload;
    },
  },
});
export const { setSportsPersonnel } = spSportsPersonnelSlice.actions;
export default spSportsPersonnelSlice.reducer;
