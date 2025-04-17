import { SliderProps } from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sliders: null as SliderProps[] | null,
};

const spHomepageSliderSlice = createSlice({
  name: 'spHomepageSlider',
  initialState,
  reducers: {
    setSliders: (state, action) => {
      state.sliders = action.payload;
    },
  },
});
export const { setSliders } = spHomepageSliderSlice.actions;
export default spHomepageSliderSlice.reducer;
