import { srGbMembersProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gbMembers: [] as srGbMembersProps[],
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
  },
});
export const { setGbMembers, unsetGbMembers } = mountainSlice.actions;
export default mountainSlice.reducer;
