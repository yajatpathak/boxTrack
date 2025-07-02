import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: UserState = {
  firstName: "Jhon",
  lastName: "Doe",
  email: "jhon@mail.com",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: () => initialState,
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
