import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trayIsRaised: false,
    trayIsEmpty: false,
    trayIsLowered: false,
    medicineDue5PM: false,
    medicineReminder5PM: false,
    trayIsRaisedOnTime: null,
    trayIsEmptyOnTime: null,
    trayIsLoweredOnTime: null,
    medicineDue5PMOnTime: null,
    medicineReminder5PMOnTime: null,
    uninterruptibleRunning: false,
    behaviorRunning: null,
    behaviorScheduled: null,
    atomicRunning: false,
};

export const robotVariableSlice = createSlice({
    name: 'robotVariable',
    initialState,
    reducers: {
        setTrayIsRaised: (state, action) => {
            state.trayIsRaised = action.payload.value;
            state.trayIsRaisedOnTime = action.payload.time;
        },
        setTrayIsEmpty: (state, action) => {
            state.trayIsEmpty = action.payload.value;
            state.trayIsEmptyOnTime = action.payload.time;
        },
        setTrayIsLowered: (state, action) => {
            state.trayIsLowered = action.payload.value;
            state.trayIsLoweredOnTime = action.payload.time;
        },
        setMedicineDue5PM: (state, action) => {
            state.medicineDue5PM = action.payload.value;
            state.medicineDue5PMOnTime = action.payload.time;
        },
        setMedicineReminder5PM: (state, action) => {
            state.medicineReminder5PM = action.payload.value;
            state.medicineReminder5PMOnTime = action.payload.time;
        },
        setAtomicRunning: (state, action) => {
            state.atomicRunning = action.payload.value;
        },
        setUninterruptibleRunning: (state, action) => {
            state.uninterruptibleRunning = action.payload.value;
        },
        setBehaviorRunning: (state, action) => {
            state.behaviorRunning = action.payload.value;
        },
        setBehaviorScheduled: (state, action) => {
            state.behaviorScheduled = action.payload.value;
        },
        clearBehaviorRunning: (state, action) => {
            state.behaviorRunning = null;
        }
    },
});

export const selectTrayIsRaised = (state) => state.robotVariable.trayIsRaised;
export const selectTrayIsEmpty = (state) => state.robotVariable.trayIsEmpty;
export const selectTrayIsLowered = (state) => state.robotVariable.trayIsLowered;
export const selectMedicineDue5PM = (state) => state.robotVariable.medicineDue5PM;
export const selectMedicineReminder5PM = (state) => state.robotVariable.medicineReminder5PM;

export const selectTrayIsRaisedOnTime = (state) => state.robotVariable.trayIsRaisedOnTime;
export const selectTrayIsEmptyOnTime = (state) => state.robotVariable.trayIsEmptyOnTime;
export const selectTrayIsLoweredOnTime = (state) => state.robotVariable.trayIsLoweredOnTime;
export const selectMedicineDue5PMOnTime = (state) => state.robotVariable.medicineDue5PMOnTime;
export const selectMedicineReminder5PMOnTime = (state) => state.robotVariable.medicineReminder5PMOnTime;

export const selectAtomicRunning = (state) => state.robotVariable.atomicRunning;
export const selectBehaviourRunning = (state) => state.robotVariable.behaviorRunning;
export const selectUninterruptibleRunning = (state) => state.robotVariable.uninterruptibleRunning;
export const selectBehaviourScheduled = (state) => state.robotVariable.behaviorScheduled;

export const { setTrayIsEmpty, setTrayIsLowered, setTrayIsRaised, setMedicineDue5PM, setMedicineReminder5PM, setAtomicRunning, setUninterruptibleRunning, setBehaviorRunning, setBehaviorScheduled, clearBehaviorRunning } = robotVariableSlice.actions;

export default robotVariableSlice.reducer;