import {
  CompCentreProps,
  CompSyllabusProps,
  ComputerCourseProps,
} from '@/types/contents';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [] as ComputerCourseProps[],
  syllabi: [] as CompSyllabusProps[],
  compCentres: [] as CompCentreProps[],
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
    setCompCentres: (state, action) => {
      state.compCentres = action.payload;
    },
    unsetCompCentres: (state) => {
      state.compCentres = [];
    },
  },
});
export const {
  setCourses,
  unsetCourses,
  setSyllabi,
  unsetSyllabi,
  setCompCentres,
  unsetCompCentres,
} = compCourseSlice.actions;
export default compCourseSlice.reducer;
