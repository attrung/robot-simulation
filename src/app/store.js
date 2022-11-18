import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import robotReducer from '../features/robot/robotSlice';
import sensorReducer from '../features/sensorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    robot: robotReducer,
    sensor: sensorReducer,
  },
});
