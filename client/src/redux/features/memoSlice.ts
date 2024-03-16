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
    updateMemo: (state, action: PayloadAction<Memo>) => {
      state = state.map((memo) =>
        memo._id === action.payload._id ? action.payload : memo
      );
      return state;
    },
    deleteMemo: (state, action: PayloadAction<{ _id: string }>) => {
      state = state.filter((memo) => memo._id !== action.payload._id);
      return state;
    },
  },
});

export const { setMemo, addMemo, updateMemo, deleteMemo } = userSlice.actions;
export default userSlice.reducer;
