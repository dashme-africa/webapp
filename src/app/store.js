import { configureStore } from '@reduxjs/toolkit';

// Import your slices (reducers) here
import itemsReducer from '../features/items/itemsSlice';
import profilesReducer from '../features/profiles/profilesSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,          // Reducer for recommended items
    profiles: profilesReducer,    // Reducer for profile data
  },
});

export default store;
