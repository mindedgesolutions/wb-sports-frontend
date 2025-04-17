import { UserProps } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null as UserProps | null,
  currentUserSp: null as UserProps | null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      state.currentUser = null;
    },
    setCurrentUserSp: (state, action) => {
      state.currentUserSp = action.payload;
    },
    unsetCurrentUserSp: (state) => {
      state.currentUserSp = null;
    },
  },
});
export const {
  setCurrentUser,
  unsetCurrentUser,
  setCurrentUserSp,
  unsetCurrentUserSp,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;
