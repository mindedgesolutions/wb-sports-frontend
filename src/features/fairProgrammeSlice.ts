import { FairGalleryOverviewProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fairs: [] as FairGalleryOverviewProps[],
};

const fairProgrammeSlice = createSlice({
  name: 'fairProgramme',
  initialState,
  reducers: {
    setFairs: (state, action) => {
      state.fairs = action.payload;
    },
  },
});
export const { setFairs } = fairProgrammeSlice.actions;
export default fairProgrammeSlice.reducer;
