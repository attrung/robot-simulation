import { store } from '../app/store';

export const AlertFridgeDoorCondition = () => {
    if (
        store.getState().sensor.fridgeOpen && 
        store.getState().time.currentTime - store.getState().sensor.fridgeOnTime >= 30 &&
        store.getState().goalVariable.GOALfridgeUserAlerted === false) {
        return true;
    }
    return false
}