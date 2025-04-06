import { DistrictBlockOfficeProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offices: [] as DistrictBlockOfficeProps[],
};

const districtBlockOfficeSlice = createSlice({
  name: 'districtBlockOffice',
  initialState,
  reducers: {
    setDistrictBlockOffices: (state, action) => {
      state.offices = action.payload;
    },
  },
});
export const { setDistrictBlockOffices } = districtBlockOfficeSlice.actions;
export default districtBlockOfficeSlice.reducer;
