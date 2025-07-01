import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

const initialState: AlertState = {
  message: "",
  severity: "success",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    sendAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearAlert: (state) => {
      state.message = "";
    },
  },
});

export const { sendAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
