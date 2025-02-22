import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for each product's structure
interface Product {
  id: string;
  name: string;
  price?: number;  // Optional field for price
  specs?: Record<string, string | number | boolean>;  // Optional specs field with more specific types
}

// Define a type for the comparison state
interface CompareState {
  compareDetails: {
    productOne: Product | null;
    productTwo: Product | null;
  } | null;
}

// Define the initial state
const initialState: CompareState = {
  compareDetails: null, 
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    // Reducer to set comparison details
    setCompare: (state, action: PayloadAction<CompareState['compareDetails']>) => {
      state.compareDetails = action.payload;
    },
    // Optional: Reducer to clear comparison details
    clearCompare: (state) => {
      state.compareDetails = null;
    },
  },
});

// Export actions for use in your components
export const { setCompare, clearCompare } = compareSlice.actions;

// Export the reducer to use in your store
export default compareSlice.reducer;
