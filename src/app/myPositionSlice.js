import { createSlice } from '@reduxjs/toolkit';
import { useGeolocation } from "@uidotdev/usehooks";

const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState: {
    lat: null,
    lon: null,
    err: null,
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