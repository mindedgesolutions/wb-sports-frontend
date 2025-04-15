import {
  DistrictBlockOfficeProps,
  DistrictWithOfficeProps,
} from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offices: [] as DistrictBlockOfficeProps[],
  webOffices: [] as DistrictWithOfficeProps[],
};

const districtBlockOfficeSlice = createSlice({
  name: 'districtBlockOffice',
  initialState,
  reducers: {
    setDistrictBlockOffices: (state, action) => {
      state.offices = action.payload;
    },
    setWebDistrictBlockOffices: (state, action) => {
      state.webOffices = action.payload;
    },
  },
});
export const { setDistrictBlockOffices, setWebDistrictBlockOffices } =
  districtBlockOfficeSlice.actions;
export default districtBlockOfficeSlice.reducer;
