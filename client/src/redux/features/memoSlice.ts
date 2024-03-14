import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Memo } from "../../api/types/memo";

type State = Memo[];
const initialState: State = [];

export const userSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<Memo[]>) => {
      state = action.payload;
      return state;
    },
    addMemo: (state, action: PayloadAction<Memo>) => {
      state = [...state, action.payload];
      return state;
    },
  },
});

export const { setMemo, addMemo } = userSlice.actions;
export default userSlice.reducer;
