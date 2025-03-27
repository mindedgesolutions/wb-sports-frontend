import { DistrictProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spCounter: 0,
  srCounter: 0,
  districts: [] as DistrictProps[],
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
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
  },
});
export const { updateSpCounter, updateSrCounter, setDistricts } =
  commonSlice.actions;
export default commonSlice.reducer;
