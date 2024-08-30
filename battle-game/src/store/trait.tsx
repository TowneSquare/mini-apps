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
export interface RevealedTraitsProps {
  traitIndex: number 
  traitUri: string | undefined;
  traitName: string | undefined
}
interface traitState {
  traits: TraitsProps | undefined;
  revealedTraits: Array<RevealedTraitsProps> ;
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
    revealTraits: (state, action: PayloadAction<RevealedTraitsProps>) => {
      state.revealedTraits = [...state.revealedTraits, action.payload];
    },
    clearRevealedTraits: (state) => {
      state.revealedTraits = []
    }
  },
});

export const { updateTrait, revealTraits, clearRevealedTraits } = traitSlice.actions;

export default traitSlice.reducer;
