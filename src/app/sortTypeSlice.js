/*
    Tipuri sortare:
    newest_first -> default: reviews.reverse()
    oldest_first -> reviews
    most_upvotes
    best_rating
    closest
*/

import { createSlice } from '@reduxjs/toolkit';

const sortTypeSlice = createSlice({
  name: 'sortType',
  initialState: {
    value: 'newest_first',
  },
  reducers: {
    setSortType: (state, action) => {
      state.value = action.payload;
      console.log("Sort type set to", action.payload);
    },
  },
});

export const { setSortType } = sortTypeSlice.actions;

export default sortTypeSlice.reducer;