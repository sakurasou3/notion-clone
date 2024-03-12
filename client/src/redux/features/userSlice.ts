import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../api/types/auth";

type State = User;
const initialState: State = { id: "", username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
