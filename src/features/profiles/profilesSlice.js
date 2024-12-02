import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [],     // Array to store user profiles
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const { setProfiles } = profilesSlice.actions;

export default profilesSlice.reducer;
