import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fridgeOpen: false,
    sofaSeated: false,
    bellRang: false,
    tvOn: false
};

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
      toggleFridgeOpen: (state) => {
        state.fridgeOpen = !state.fridgeOpen;
      },
      toggleSofaSeated: (state) => {
        state.sofaSeated = !state.sofaSeated;
      },
      toggleBellRang: (state) => {
        state.bellRang = !state.bellRang;
      },
      toggleTvOn: (state) => {
        state.tvOn = !state.tvOn;
      }
    },
  });

export const selectFridgeOpen = (state) => state.sensor.fridgeOpen;
export const selectSofaSeated = (state) => state.sensor.sofaSeated;
export const selectBellRang = (state) => state.sensor.bellRang;
export const selectTvOn = (state) => state.sensor.tvOn;

export const {toggleFridgeOpen, toggleSofaSeated, toggleBellRang, toggleTvOn} = sensorSlice.actions;

export default sensorSlice.reducer;