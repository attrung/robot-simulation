import { store } from '../app/store';
import { setColourWhite, setColourYellow, setSpeakText, clearSpeakText, setAction, clearAction, setTorso } from '../features/robotUISlice';
import { setGOALgoToCharger, setGOALgoToTable, setGOALgoToSofa, setGOALfridgeUserAlerted, setGOALwatchTV, setGOALwaitHere, setGOALgoToKitchen, setGOALwaitAtKitchen, setGOALwaitAtSofa, setGOALwaitAtTable } from '../features/goalVariableSlice';
import { moveRobotRoom } from '../utils/RobotMovement';
import { clearBehaviorRunning, setBehaviorRunning, setMedicineDue5PM, setMedicineReminder5PM, setTrayIsEmpty, setTrayIsLowered, setTrayIsRaised, setUninterruptibleRunning } from '../features/robotVariableSlice';

export const AlertFridgeDoor = (map, robot) => {
    store.dispatch(setUninterruptibleRunning({
        value: true,
    }))
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
            store.dispatch(setUninterruptibleRunning({
                value: false,
            }))
        }
    }
    afterMove();
}

export const RemindFridgeDoor = () => {
    store.dispatch(setUninterruptibleRunning({
        value: true,
    }))
    store.dispatch(setGOALfridgeUserAlerted({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setUninterruptibleRunning({
        value: false,
    }))
}

export const Med5PMReset = () => {
    store.dispatch(setUninterruptibleRunning({
        value: true,
    }))
    store.dispatch(setMedicineDue5PM({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setMedicineReminder5PM({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setUninterruptibleRunning({
        value: false,
    }))
}

export const Med5PMRemind = (map, robot) => {
    store.dispatch(setColourYellow());
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            store.dispatch(setColourWhite());
            store.dispatch(setSpeakText({
                value: "Have you taken your medicine"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
            }, 10000);
            store.dispatch(setMedicineReminder5PM({
                value: false,
                time: store.getState().time.currentTime,
            }))
        }
    }
    afterMove();
}

export const Med5PM = (map, robot) => {
    store.dispatch(setColourYellow());
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            store.dispatch(setColourWhite());
            store.dispatch(setSpeakText({
                value: "Its time for your medicine"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
            }, 10000);
            store.dispatch(setMedicineDue5PM({
                value: false,
                time: store.getState().time.currentTime,
            }))
            store.dispatch(setMedicineReminder5PM({
                value: true,
                time: store.getState().time.currentTime,
            }))
        }
    }
    afterMove();
}

export const LowerTray = () => {
    if (store.getState().robotVariable.behaviorRunning === "lowerTray") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "lowerTray"
    }))
    store.dispatch(setColourYellow());
    store.dispatch(setAction({
        value: "Lowering Tray",
    }))
    setTimeout(() => {
        store.dispatch(clearAction());
        store.dispatch(setColourWhite());
        store.dispatch(setTrayIsRaised({
            value: false,
            time: store.getState().time.currentTime,
        }))
        store.dispatch(setTrayIsLowered({
            value: true,
            time: store.getState().time.currentTime,
        }))
        store.dispatch(clearBehaviorRunning());
    }, 5000);
}

export const watchTV = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "watchTV") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "watchTV"
    }))
    store.dispatch(setColourYellow());
    store.dispatch(setAction({
        value: "Lowering Tray",
    }))
    setTimeout(() => {
        store.dispatch(clearAction());
        store.dispatch(setTrayIsRaised({
            value: false,
            time: store.getState().time.currentTime,
        }))
        store.dispatch(setTrayIsLowered({
            value: true,
            time: store.getState().time.currentTime,
        }))
        moveRobotRoom(map, robot, 'tv');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                store.dispatch(setColourWhite());
                store.dispatch(setSpeakText({
                    value: "Shall we watch TV together?"
                }))
                setTimeout(() => {
                    store.dispatch(clearSpeakText());
                }, 5000);
                store.dispatch(setGOALwatchTV({
                    value: false,
                    time: store.getState().time.currentTime,
                }))
                store.dispatch(clearBehaviorRunning());
            }
        }
        afterMove();
    }, 5000);
}

export const ContinueWatchTV = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "continueWatchTV") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "continueWatchTV"
    }))
    store.dispatch(setColourYellow());
    store.dispatch(setAction({
        value: "Lowering Tray",
    }))
    setTimeout(() => {
        store.dispatch(clearAction());
        store.dispatch(setTrayIsRaised({
            value: false,
            time: store.getState().time.currentTime,
        }))
        store.dispatch(setTrayIsLowered({
            value: true,
            time: store.getState().time.currentTime,
        }))
        moveRobotRoom(map, robot, 'tv');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                store.dispatch(setColourWhite());
                store.dispatch(setAction({
                    value: "Moving Torso Right",
                }))
                setTimeout(() => {
                    store.dispatch(setTorso({
                        value: "right"
                    }))
                    store.dispatch(setAction({
                        value: "Moving Torso Back",
                    }))
                    setTimeout(() => {
                        store.dispatch(setTorso({
                            value: "back"
                        }));
                    }, 3000)
                }, 3000)
            }
        }
        afterMove();
    }, 5000);
}

export const SetContinue = () => {
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwatchTV({
        value: false,
        time: store.getState().time.currentTime,
    }))
}

export const SetGoToKitchen = () => {
    store.dispatch(setGOALgoToKitchen({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
}

export const SetGoToSofa = () => {
    store.dispatch(setGOALgoToSofa({
        value: true,
        time: store.getState().time.currentTime,
    }))
}

export const SetGoToTable = () => {
    store.dispatch(setGOALgoToTable({
        value: true,
        time: store.getState().time.currentTime,
    }))
}

export const SetReturnHome = () => {
    store.dispatch(setGOALgoToCharger({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwatchTV({
        value: false,
        time: store.getState().time.currentTime,
    }))
}

export const SetWaitHere = () => {
    store.dispatch(setGOALwaitHere({
        value: true,
        time: store.getState().time.currentTime,
    }))
}

export const SetWatchTV = () => {
    store.dispatch(setGOALwatchTV({
        value: true,
        time: store.getState().time.currentTime,
    }))
}

export const ResetAllGoals = () => {
    store.dispatch(setTrayIsRaised({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setTrayIsLowered({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setMedicineDue5PM({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setMedicineReminder5PM({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setTrayIsEmpty({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALgoToKitchen({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALgoToCharger({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(SetGoToTable({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALgoToSofa({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitAtKitchen({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitAtSofa({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitAtTable({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwatchTV({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALfridgeUserAlerted({
        value: false,
        time: store.getState().time.currentTime,
    }))
}