import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        // Array to store recommended items
  status: 'idle',   // Status of the API call (idle, loading, succeeded, failed)
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
