import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    GOALanswerDoorBell: false,
    GOALfridgeUserAlerted: false,
    GOALgoToCharger: false,
    GOALgoToTable: false,
    GOALwaitAtTable: false,
    GOALgoToSofa: false,
    GOALwaitAtSofa: false,
    GOALwatchTV: false,
    GOALgoToKitchen: false,
    GOALwaitAtKitchen: false,
    GOALwaitHere: false,

    GOALanswerDoorBellOnTime: null,
    GOALfridgeUserAlertedOnTime: null,
    GOALgoToChargerOnTime: null,
    GOALgoToTableOnTime: null,
    GOALwaitAtTableOnTime: null,
    GOALgoToSofaOnTime: null,
    GOALwaitAtSofaOnTime: null,
    GOALwatchTVOnTime: null,
    GOALgoToKitchenOnTime: null,
    GOALwaitAtKitchenOnTime: null,
    GOALwaitHereOnTime: null,
};

export const goalVariableSlice = createSlice({
    name: 'goalVariable',
    initialState,
    reducers: {
        setGOALanswerDoorBell: (state, action) => {
            state.GOALanswerDoorBell = action.payload.value;
            state.GOALanswerDoorBellOnTime = action.payload.time;
        },
        setGOALfridgeUserAlerted: (state, action) => {
            state.GOALfridgeUserAlerted = action.payload.value;
            state.GOALfridgeUserAlertedOnTime = action.payload.time;
        },
        setGOALgoToCharger: (state, action) => {
            state.GOALgoToCharger = action.payload.value;
            state.GOALgoToChargerOnTime = action.payload.time;
        },
        setGOALgoToTable: (state, action) => {
            state.GOALgoToTable = action.payload.value;
            state.GOALgoToTableOnTime = action.payload.time;
        },
        setGOALwaitAtTable: (state, action) => {
            state.GOALwaitAtTable = action.payload.value;
            state.GOALwaitAtTableOnTime = action.payload.time;
        },
        setGOALgoToSofa: (state, action) => {
            state.GOALgoToSofa = action.payload.value;
            state.GOALgoToSofaOnTime = action.payload.time;
        },
        setGOALwaitAtSofa: (state, action) => {
            state.GOALwaitAtSofa = action.payload.value;
            state.GOALwaitAtSofaOnTime = action.payload.time;
        },
        setGOALwatchTV: (state, action) => {
            state.GOALwatchTV = action.payload.value;
            state.GOALwaitAtSofaOnTime = action.payload.time;
        },
        setGOALgoToKitchen: (state, action) => {
            state.GOALgoToKitchen = action.payload.value;
            state.GOALgoToKitchenOnTime = action.payload.time;
        },
        setGOALwaitAtKitchen: (state, action) => {
            state.GOALwaitAtKitchen = action.payload.value;
            state.GOALwaitAtKitchenOnTime = action.payload.time;
        },
        setGOALwaitHere: (state, action) => {
            state.GOALwaitHere = action.payload.value;
            state.GOALwaitHereOnTime = action.payload.time;
        }
    },
  });

export const selectGOALanswerDoorBell = (state) => state.goalVariable.GOALanswerDoorBell;
export const selectGOALfridgeUserAlerted = (state) => state.goalVariable.GOALfridgeUserAlerted;
export const selectGOALgoToCharger = (state) => state.goalVariable.GOALgoToCharger;
export const selectGOALgoToTable = (state) => state.goalVariable.GOALgoToTable;
export const selectGOALwaitAtTable = (state) => state.goalVariable.GOALwaitAtTable;
export const selectGOALgoToSofa = (state) => state.goalVariable.GOALgoToSofa;
export const selectGOALwaitAtSofa = (state) => state.goalVariable.GOALwaitAtSofa;
export const selectGOALwatchTV = (state) => state.goalVariable.GOALwatchTV;
export const selectGOALgoToKitchen = (state) => state.goalVariable.GOALgoToKitchen;
export const selectGOALwaitAtKitchen = (state) => state.goalVariable.GOALwaitAtKitchen;
export const selectGOALwaitHere = (state) => state.goalVariable.GOALwaitHere;



export const selectGOALanswerDoorBellOnTime = (state) => state.goalVariable.GOALanswerDoorBellOnTime;
export const selectGOALfridgeUserAlertedOnTime = (state) => state.goalVariable.GOALfridgeUserAlertedOnTime;
export const selectGOALgoToChargerOnTime = (state) => state.goalVariable.GOALgoToChargerOnTime;
export const selectGOALgoToTableOnTime = (state) => state.goalVariable.GOALgoToTableOnTime;
export const selectGOALwaitAtTableOnTime = (state) => state.goalVariable.GOALwaitAtTableOnTime;
export const selectGOALgoToSofaOnTime = (state) => state.goalVariable.GOALgoToSofaOnTime;
export const selectGOALwaitAtSofaOnTime = (state) => state.goalVariable.GOALwaitAtSofaOnTime;
export const selectGOALwatchTVOnTime = (state) => state.goalVariable.GOALwatchTVOnTime;
export const selectGOALgoToKitchenOnTime = (state) => state.goalVariable.GOALgoToKitchenOnTime;
export const selectGOALwaitAtKitchenOnTime = (state) => state.goalVariable.GOALwaitAtKitchenOnTime;
export const selectGOALwaitHereOnTime = (state) => state.goalVariable.GOALwaitHereOnTime;

export const {
    setGOALfridgeUserAlerted, 
    setGOALgoToCharger, 
    setGOALanswerDoorBell, 
    setGOALgoToTable, 
    setGOALwaitAtTable,
    setGOALgoToSofa,
    setGOALwaitAtSofa,
    setGOALgoToKitchen,
    setGOALwaitAtKitchen,
    setGOALwatchTV,
    setGOALwaitHere} = goalVariableSlice.actions;

export default goalVariableSlice.reducer;