import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fridgeOpen: false,
    sofaSeated: false,
    bellRang: false,
    tvOn: false,
    fridgeOnTime: 0,
    sofaOnTime: 0,
    bellOnTime: 0,
    tvOnTime: 0
};

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
      toggleFridgeOpen: (state, action) => {
        state.fridgeOpen = !state.fridgeOpen;
        state.fridgeOnTime = action.payload.time;
      },
      toggleSofaSeated: (state, action) => {
        state.sofaSeated = !state.sofaSeated;
        state.sofaOnTime = action.payload.time;
      },
      toggleBellRang: (state, action) => {
        state.bellRang = !state.bellRang;
        state.bellOnTime = action.payload.time;
      },
      toggleTvOn: (state, action) => {
        state.tvOn = !state.tvOn;
        state.tvOnTime = action.payload.time;
      }
    },
  });

export const selectFridgeOpen = (state) => state.sensor.fridgeOpen;
export const selectSofaSeated = (state) => state.sensor.sofaSeated;
export const selectBellRang = (state) => state.sensor.bellRang;
export const selectTvOn = (state) => state.sensor.tvOn;

export const selectFridgeTime = (state) => state.sensor.fridgeOnTime;
export const selectSofaTime = (state) => state.sensor.sofaOnTime;
export const selectBellTime = (state) => state.sensor.bellOnTime;
export const selectTvTime = (state) => state.sensor.tvOnTime;

export const {toggleFridgeOpen, toggleSofaSeated, toggleBellRang, toggleTvOn} = sensorSlice.actions;

export default sensorSlice.reducer;