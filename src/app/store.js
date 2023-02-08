import { configureStore } from '@reduxjs/toolkit';
import movementReducer from '../features/movementSlice';
import sensorReducer from '../features/sensorSlice';
import timeReducer from '../features/timeSlice';
import robotVariableReducer from '../features/robotVariableSlice';
import goalVariableReducer from '../features/goalVariableSlice';
import robotUIReducer from '../features/robotUISlice';

export const store = configureStore({
  reducer: {
    movement: movementReducer,
    sensor: sensorReducer,
    time: timeReducer,
    robotVariable: robotVariableReducer,
    goalVariable: goalVariableReducer,
    robotUI: robotUIReducer,
  },
});
