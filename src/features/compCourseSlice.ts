import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  syllabi: [],
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
    setSyllabi: (state, action) => {
      state.syllabi = action.payload;
    },
    unsetSyllabi: (state) => {
      state.syllabi = [];
    },
  },
});
export const { setCourses, unsetCourses, setSyllabi, unsetSyllabi } =
  compCourseSlice.actions;
export default compCourseSlice.reducer;
