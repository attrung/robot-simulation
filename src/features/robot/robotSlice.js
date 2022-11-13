import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    canvas: null,
};

export const robotSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      setCanvas: (state, action) => {
        state.value = action.payload;
      },
    },
  });

  export const canvas = (state) => state.canvas;

  export const {setCanvas} = robotSlice.actions;

  export default robotSlice.reducer;
