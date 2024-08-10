import { configureStore } from "@reduxjs/toolkit";
import traitSlice from "./trait";

export const store = configureStore({
  reducer: {
    traitState: traitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
