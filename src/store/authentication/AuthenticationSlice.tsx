// authenticationSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userData: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userData: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginSuccess(state: AuthState, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    logoutSuccess(state: AuthState) {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
    },
    updateUserData(state: AuthState, action) {
      state.userData = action.payload.userData;
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserData } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
