import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/commonSlice';
import currentUserReducer from '@/features/currentUserSlice';
import bannerReducer from '@/features/bannerSlice';
import compCourseReducer from '@/features/compCourseSlice';
import mountainReducer from '@/features/mountainSlice';
import districtBlockOfficeReducer from '@/features/districtBlockOfficeSlice';
import fairProgrammeReducer from '@/features/fairProgrammeSlice';
import hostelReducer from '@/features/hostelSlice';
// Sports reducers start ------------------------------
import spHomepageSliderReducer from '@/features/sports/spHomepageSliderSlice';
import spKeyPersonnelReducer from '@/features/sports/spKeyPersonnelSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
    banners: bannerReducer,
    compCourses: compCourseReducer,
    mountains: mountainReducer,
    districtBlockOffices: districtBlockOfficeReducer,
    fairProgrammes: fairProgrammeReducer,
    hostels: hostelReducer,
    // Sports reducers start ------------------------------
    spHomepageSliders: spHomepageSliderReducer,
    spKeyPersonnel: spKeyPersonnelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
