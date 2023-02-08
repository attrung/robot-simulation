import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lightColour: null,
    speakText: null,
    GUI1: null,
    GUI2: null,
    GUI3: null,
};

export const robotUISlice = createSlice({
    name: 'robotUI',
    initialState,
    reducers: {
        setColourYellow: (state) => {
            state.lightColour = "yellow";
        },
        setColourWhite: (state) => {
            state.lightColour = "white";
        },
        clearColour: (state) => {
            state.lightColour = null;
        },
        setSpeakText: (state, action) => {
            state.speakText = action.payload.value;
        },
        clearSpeakText: (state, action) => {
            state.speakText = null;
        },
        setGUI1: (state, action) => {
            state.GUI1 = action.payload.value;
        },
        setGUI2: (state, action) => {
            state.GUI2 = action.payload.value;
        },
        setGUI3: (state, action) => {
            state.GUI3 = action.payload.value;
        },
        clearGUI: (state, action) => {
            state.GUI1 = null;
            state.GUI2 = null;
            state.GUI3 = null;
        }
    },
  });

export const selectLightColour = (state) => state.robotUI.lightColour;
export const selectSpeakText = (state) => state.robotUI.speakText;
export const selectGUI1 = (state) => state.robotUI.GUI1;
export const selectGUI2 = (state) => state.robotUI.GUI2;
export const selectGUI3 = (state) => state.robotUI.GUI3;

export const {setColourYellow, setColourWhite, clearColour, setSpeakText, clearSpeakText, setGUI1, setGUI2, setGUI3, clearGUI} = robotUISlice.actions;

export default robotUISlice.reducer;