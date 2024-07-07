// src/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to load user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (e) {
    console.warn("Error loading user from localStorage", e);
    return null;
  }
};

// Helper function to save user to localStorage
const saveUserToLocalStorage = (user) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (e) {
    console.warn("Error saving user to localStorage", e);
  }
};

// Helper function to remove user from localStorage
const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.warn("Error removing user from localStorage", e);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: loadUserFromLocalStorage(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
    addToSavedReviews: (state, action) => {
      state.user.saved_reviews.push(action.payload);
      saveUserToLocalStorage(state.user);
    },
    removeFromSavedReviews: (state, action) => {
      state.user.saved_reviews = state.user.saved_reviews.filter((review_id) => review_id !== action.payload);
      saveUserToLocalStorage(state.user);
    },
  },
});

export const { setUser, clearUser, addToSavedReviews, removeFromSavedReviews } = userSlice.actions;

export const registerUser = (user, navigate) => async (dispatch) => {
  try {
    await axios.post('https://localhost:5000/auth/register/password', user);
    // Optionally log in the user after registration
    dispatch(loginUser(user.username, user.password, navigate));
  } catch (error) {
    console.error('Failed to register:', error);
  }
};

export const loginUser = (username, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('https://localhost:5000/auth/login/password', { username, password });
    console.log('Login response:', response.data);
    dispatch(setUser(response.data));
    navigate("/main");
  } catch (error) {
    console.error('Failed to login:', error);
  }
};

export const logoutUser = () => async (dispatch, navigate) => {
  try {
    await axios.get('https://localhost:5000/auth/logout');
    dispatch(clearUser());
    navigate("/");
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};

export default userSlice.reducer;
