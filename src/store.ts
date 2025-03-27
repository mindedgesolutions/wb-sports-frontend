import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/commonSlice';
import currentUserReducer from '@/features/currentUserSlice';
import bannerReducer from '@/features/bannerSlice';
import compCourseReducer from '@/features/compCourseSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
    banners: bannerReducer,
    compCourses: compCourseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
