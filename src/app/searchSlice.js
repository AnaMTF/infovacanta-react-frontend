import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
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
    },
  },
});

export const { setSearchFilters } = searchSlice.actions;

export default searchSlice.reducer;