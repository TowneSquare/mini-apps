import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TraitsProps {
  backgrounds: string[];
  badges: string[];
  clothings: string[];
  cool_sloths: string[];
  eyes: string[];
  hats: string[];
  mouths: string[];
}
interface traitState {
  traits: TraitsProps | undefined;
  revealedTraits: Array<Number>;
}

const initialState: traitState = {
  traits: {
    backgrounds: [],
    badges: [],
    clothings: [],
    cool_sloths: [],
    eyes: [],
    hats: [],
    mouths: [],
  },
  revealedTraits: [],
};

export const traitSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateTrait: (state, action: PayloadAction<TraitsProps | undefined>) => {
      state.traits = action.payload;
    },
    revealTraits: (state, action: PayloadAction<number>) => {
      state.revealedTraits = [...state.revealedTraits, action.payload];
    },
  },
});

export const { updateTrait, revealTraits } = traitSlice.actions;

export default traitSlice.reducer;
