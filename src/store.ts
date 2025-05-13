import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/commonSlice';
import currentUserReducer from '@/features/currentUserSlice';
import bannerReducer from '@/features/bannerSlice';
import compCourseReducer from '@/features/compCourseSlice';
import mountainReducer from '@/features/mountainSlice';
import districtBlockOfficeReducer from '@/features/districtBlockOfficeSlice';
import fairProgrammeReducer from '@/features/fairProgrammeSlice';
import hostelReducer from '@/features/hostelSlice';
import newsEventsReducer from '@/features/newsEventsSlice';
// Sports reducers start ------------------------------
import spHomepageSliderReducer from '@/features/sports/spHomepageSliderSlice';
import spKeyPersonnelReducer from '@/features/sports/spKeyPersonnelSlice';
import spSportsPersonnelReducer from '@/features/sports/spSportsPersonnelSlice';

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
    newsEvents: newsEventsReducer,
    // Sports reducers start ------------------------------
    spHomepageSliders: spHomepageSliderReducer,
    spKeyPersonnel: spKeyPersonnelReducer,
    spSportsPersonnel: spSportsPersonnelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
