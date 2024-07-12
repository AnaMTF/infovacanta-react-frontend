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
    value: 'oldest_first',
  },
  reducers: {
    setSortType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default sortTypeSlice.reducer;