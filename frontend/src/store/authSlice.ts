import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";
import isTokenValid from "../helperFunctions/isTokenValid";

interface AuthState {
  isAutharized: boolean;
}

function getInitialAuthState(): AuthState {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && isTokenValid(accessToken)) return { isAutharized: true };

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (refreshToken && isTokenValid(refreshToken)) return { isAutharized: true };

  return { isAutharized: false };
}

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAutharized = false;
    },
    login: (state) => {
      state.isAutharized = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
