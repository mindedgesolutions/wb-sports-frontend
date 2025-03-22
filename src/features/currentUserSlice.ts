import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
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
  },
});
export const { setCurrentUser, unsetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
