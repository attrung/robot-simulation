import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import robotReducer from '../features/robotSlice';
import sensorReducer from '../features/sensorSlice';
import timeReducer from '../features/timeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    robot: robotReducer,
    sensor: sensorReducer,
    time: timeReducer,
  },
});
