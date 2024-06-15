import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isBeachDestination: false,
        isMountainDestination: false,
        isThermalSpringDestination: false,
        searchInReviews: false,
        searchInUsers: false,
        searchInDestinations: false,
        searchInComments: false,
        minDate: '',
        maxDate: '',
        minRatings: 0,
    },
    reducers: {
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
    },
});