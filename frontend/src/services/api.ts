import axios from "axios";

import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "./constants";
import isTokenValid from "../helperFunctions/isTokenValid";
import store from "../store/store";
import { logout } from "../store/authSlice";
import { sendAlert } from "../store/alertSlice";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  if (!store.getState().auth.isAutharized) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken && isTokenValid(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || !isTokenValid(refreshToken)) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    store.dispatch(logout());
    store.dispatch(
      sendAlert({ message: "You were logged out.", severity: "error" })
    );
    return config;
  }

  try {
    const res = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = res.data.access;
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    config.headers.Authorization = `Bearer ${newAccessToken}`;
  } catch (err) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    store.dispatch(logout());
    store.dispatch(
      sendAlert({ message: "You were logged out.", severity: "error" })
    );
  }

  return config;
});

export default api;
