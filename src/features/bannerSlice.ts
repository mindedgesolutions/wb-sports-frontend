import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banners: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    unsetBanners: (state) => {
      state.banners = [];
    },
  },
});
export const { setBanners, unsetBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
