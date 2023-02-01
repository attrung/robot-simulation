import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movementReducer from '../features/movementSlice';
import sensorReducer from '../features/sensorSlice';
import timeReducer from '../features/timeSlice';
import robotVariableReducer from '../features/robotVariableSlice';
import goalVariableReducer from '../features/goalVariableSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    robot: movementReducer,
    sensor: sensorReducer,
    time: timeReducer,
    robotVariable: robotVariableReducer,
    goalVariable: goalVariableReducer,
  },
});
