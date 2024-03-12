import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppStore = typeof store;
export const useAppStore: () => AppStore = useStore;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
