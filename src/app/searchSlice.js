import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Function to save the state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('searchState', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

// Function to load the state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('searchState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState: loadStateFromLocalStorage() || {
    filters: {
      isBeachDestination: false,
      isMountainDestination: false,
      isThermalSpringDestination: false,
      searchInReviews: true,
      searchInUsers: false,
      searchInDestinations: false,
      searchInComments: false,
      minDate: '',
      maxDate: '',
      minRatings: 0,
    }
  },
  reducers: {
    setSearchFilters: (state, action) => {
      // state.value = action.payload;
      state.filters = action.payload;
      saveStateToLocalStorage(state);
    },
  },
});

export const { setSearchFilters } = searchSlice.actions;

export default searchSlice.reducer;