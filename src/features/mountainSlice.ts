import { srGbMembersProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gbMembers: [] as srGbMembersProps[],
  webGbMembers: [] as srGbMembersProps[],
};

const mountainSlice = createSlice({
  name: 'mountain',
  initialState,
  reducers: {
    setGbMembers: (state, action) => {
      state.gbMembers = action.payload;
    },
    unsetGbMembers: (state) => {
      state.gbMembers = initialState.gbMembers;
    },
    setWebGbMembers: (state, action) => {
      state.webGbMembers = action.payload;
    },
    unsetWebGbMembers: (state) => {
      state.webGbMembers = initialState.webGbMembers;
    },
  },
});
export const {
  setGbMembers,
  unsetGbMembers,
  setWebGbMembers,
  unsetWebGbMembers,
} = mountainSlice.actions;
export default mountainSlice.reducer;
