import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
};

const compCourseSlice = createSlice({
  name: 'compCourses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    unsetCourses: (state) => {
      state.courses = [];
    },
  },
});
export const { setCourses, unsetCourses } = compCourseSlice.actions;
export default compCourseSlice.reducer;
