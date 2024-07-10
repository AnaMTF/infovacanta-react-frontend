import { createSlice } from '@reduxjs/toolkit';
import { useGeolocation } from "@uidotdev/usehooks";

const loadGeolocation = () => {
  const { latitude, longitude, error } = useGeolocation();
  return { latitude, longitude, error };
};

const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState: loadGeolocation() || {
    latitude: null,
    longitude: null,
    error: null,
  },
  reducers: {
    setMyPosition: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.error = action.payload.error;
    },
  },
});

export default myPositionSlice.reducer;