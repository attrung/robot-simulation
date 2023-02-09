import { store } from '../app/store';
import { setColourWhite, setColourYellow, setSpeakText, clearSpeakText } from '../features/robotUISlice';
import { setGOALgoToCharger, setGOALgoToTable, setGOALgoToSofa, setGOALfridgeUserAlerted } from '../features/goalVariableSlice';
import { moveRobotRoom } from '../utils/RobotMovement';

export const AlertFridgeDoor = (map, robot) => {
    store.dispatch(setColourYellow());
    moveRobotRoom(map, robot, 'tv');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            store.dispatch(setColourWhite());
            store.dispatch(setSpeakText({
                value: "The fridge door is open"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
            }, 10000);
            store.dispatch(setGOALgoToCharger({
                value: false,
                time: store.getState().time.currentTime,
            }));
            store.dispatch(setGOALgoToTable({
                value: false,
                time: store.getState().time.currentTime,
            }));
            store.dispatch(setGOALgoToSofa({
                value: false,
                time: store.getState().time.currentTime,
            }));
            store.dispatch(setGOALfridgeUserAlerted({
                value: true,
                time: store.getState().time.currentTime,
            }))
        }
    }
    afterMove();
}

export const RemindFridgeDoor = () => {
    store.dispatch(setGOALfridgeUserAlerted({
        value: false,
        time: store.getState().time.currentTime,
    }))
}