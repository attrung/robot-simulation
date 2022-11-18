import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fridgeOpen: false,
};

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
      toggleFridgeOpen: (state) => {
        state.fridgeOpen = !state.fridgeOpen;
      },
    },
  });

export const selectFridgeOpen = (state) => state.sensor.fridgeOpen;

export const {toggleFridgeOpen} = sensorSlice.actions;

export default sensorSlice.reducer;