import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appState {
  headerState: boolean;
}
const initialState: appState = {
  headerState: false,
};

export const appSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateHeaderState: (state, action: PayloadAction<boolean>) => {
      state.headerState = action.payload;
    },
  },
});

export const { updateHeaderState } = appSlice.actions;

export default appSlice.reducer;
