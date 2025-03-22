import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '@/features/commonSlice';
import currentUserReducer from '@/features/currentUserSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
