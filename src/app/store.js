// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import myPositionReducer from './myPositionSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        myPosition: myPositionReducer,
    },
});

