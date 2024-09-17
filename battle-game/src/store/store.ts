import { configureStore } from "@reduxjs/toolkit";
import traitSlice from "./trait";
import appSlice from "./app";

export const store = configureStore({
  reducer: {
    traitState: traitSlice,
    appState: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
