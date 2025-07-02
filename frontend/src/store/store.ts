import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    alert: alertReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
