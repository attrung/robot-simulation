import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: 8 * 3600,
    multiplier: 1,
};

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
      incrementTime: (state) => {
        state.currentTime += state.multiplier / 10;
        state.currentTime %= (3600 * 24);
      },
      setMultiplier: (state, action) => {
        state.multiplier = parseFloat(action.payload.multiplier);
      },
    },
  });

export const selectTimeInString = (state) => {
    var seconds = Math.floor(state.time.currentTime % 60)
    if (seconds.toString().length === 1){
        seconds = "0" + seconds
    }
    var minutes = Math.floor(((state.time.currentTime % 3600) / 60))
    if (minutes.toString().length === 1) {
        minutes = "0" + minutes
    }
    var hours = Math.floor((state.time.currentTime / 3600))
    if (hours.toString().length === 1){
        hours = "0" + hours
    }
    return hours + ":" + minutes + ":" + seconds
}

export const selectMultiplier = (state) => state.time.multiplier;
export const selectCurrentTime = (state) => state.time.currentTime;

export const {incrementTime, setMultiplier} = timeSlice.actions;

export default timeSlice.reducer;