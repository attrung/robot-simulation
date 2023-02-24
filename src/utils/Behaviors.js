import { store } from '../app/store';
import { setColourWhite, setColourYellow, setSpeakText, clearSpeakText, setAction, clearAction, setTorso, setGUI1, clearGUI, setGUI2, setGUI3 } from '../features/robotUISlice';
import { setGOALgoToCharger, setGOALgoToTable, setGOALgoToSofa, setGOALfridgeUserAlerted, setGOALwatchTV, setGOALwaitHere, setGOALgoToKitchen, setGOALwaitAtKitchen, setGOALwaitAtSofa, setGOALwaitAtTable } from '../features/goalVariableSlice';
import { moveRobotRoom } from '../utils/RobotMovement';
import { clearBehaviorRunning, setAtomicRunning, setBehaviorRunning, setMedicineDue5PM, setMedicineReminder5PM, setTrayIsEmpty, setTrayIsLowered, setTrayIsRaised, setUninterruptibleRunning } from '../features/robotVariableSlice';
import { LowerTrayCondition } from './BehaviorsConditions';

export const AlertFridgeDoor = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "alertFridgeDoor") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "alertFridgeDoor"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            endAtomic();
            store.dispatch(setColourWhite());
            startAtomic()
            store.dispatch(setSpeakText({
                value: "The fridge door is open"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
                endAtomic();
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
                setGUI("GoToKitchen", "WaitHere");
                store.dispatch(setGOALfridgeUserAlerted({
                    value: true,
                    time: store.getState().time.currentTime,
                }))
                endUninterruptible();
            }, 5000);
        }
    }
    afterMove();
}

export const RemindFridgeDoor = () => {
    if (store.getState().robotVariable.behaviorRunning === "remindFridgeDoor") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "remindFridgeDoor"
    }))
    store.dispatch(setGOALfridgeUserAlerted({
        value: false,
        time: store.getState().time.currentTime,
    }))
    endUninterruptible();
}

export const Med5PMReset = () => {
    if (store.getState().robotVariable.behaviorRunning === "med5PMReset") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "med5PMReset"
    }))
    store.dispatch(setMedicineDue5PM({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setMedicineReminder5PM({
        value: false,
        time: store.getState().time.currentTime,
    }))
    endUninterruptible();
}

export const Med5PMRemind = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "med5PMRemind") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "med5PMRemind"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            endAtomic();
            if (store.getState().robotVariable.behaviorScheduled !== "med5PMRemind") {
                // interrupted
                return;
            }
            store.dispatch(setColourWhite());
            startAtomic();
            store.dispatch(setSpeakText({
                value: "Have you taken your medicine?"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
                endAtomic();
                store.dispatch(setMedicineReminder5PM({
                    value: false,
                    time: store.getState().time.currentTime,
                }))
            }, 5000);
        }
    }
    afterMove();
}

export const Med5PM = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "med5PM") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "med5PM"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            endAtomic();
            if (store.getState().robotVariable.behaviorScheduled !== "med5PM") {
                return;
            }
            store.dispatch(setColourWhite());
            startAtomic();
            store.dispatch(setSpeakText({
                value: "Its time for your medicine"
            }));
            setTimeout(() => {
                store.dispatch(clearSpeakText());
                endAtomic();
                store.dispatch(setMedicineDue5PM({
                    value: false,
                    time: store.getState().time.currentTime,
                }))
                store.dispatch(setMedicineReminder5PM({
                    value: true,
                    time: store.getState().time.currentTime,
                }))
                setGUI("GoToKitchen", "ReturnHome", "WaitHere");
            }, 5000);
        }
    }
    afterMove();
}

export const LowerTray = () => {
    if (store.getState().robotVariable.behaviorRunning === "lowerTray") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "lowerTray"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
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
        endAtomic();
        endUninterruptible();
    }, 5000);
}

export const WatchTV = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "WatchTV") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "watchTV"
    }))
    store.dispatch(setColourYellow());
    var timeout_tray = 0;
    if (LowerTrayCondition()) {
        timeout_tray = 5000;
        startAtomic();
        store.dispatch(setAction({
            value: "Lowering Tray",
        }))
    }
    setTimeout(() => {
        store.dispatch(clearAction());
        if (timeout_tray !== 0) {
            store.dispatch(setTrayIsRaised({
                value: false,
                time: store.getState().time.currentTime,
            }))
            store.dispatch(setTrayIsLowered({
                value: true,
                time: store.getState().time.currentTime,
            }))
        }
        endAtomic();
        if (store.getState().robotVariable.behaviorScheduled !== "WatchTV") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'tv');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "WatchTV") {
                    return;
                }
                store.dispatch(setColourWhite());
                startAtomic();
                store.dispatch(setSpeakText({
                    value: "Shall we watch TV together?"
                }))
                setTimeout(() => {
                    store.dispatch(clearSpeakText());
                    store.dispatch(setGOALwatchTV({
                        value: false,
                        time: store.getState().time.currentTime,
                    }))
                    setGUI("WatchTV", "ReturnHome", "Continue");
                    endAtomic();
                }, 8000);
            }
        }
        afterMove();
    }, timeout_tray);
}

export const ContinueWatchTV = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "ContinueWatchTV") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "ContinueWatchTV"
    }))
    store.dispatch(setColourYellow());
    var timeout_tray = 0;
    if (LowerTrayCondition()) {
        timeout_tray = 5000;
        startAtomic();
        store.dispatch(setAction({
            value: "Lowering Tray",
        }))
    }
    setTimeout(() => {
        store.dispatch(clearAction());
        if (timeout_tray !== 0) {
            store.dispatch(setTrayIsRaised({
                value: false,
                time: store.getState().time.currentTime,
            }))
            store.dispatch(setTrayIsLowered({
                value: true,
                time: store.getState().time.currentTime,
            }))
        }
        endAtomic();
        if (store.getState().robotVariable.behaviorScheduled !== "ContinueWatchTV") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'tv');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "ContinueWatchTV") {
                    return;
                }
                store.dispatch(setColourWhite());
                startAtomic();
                store.dispatch(setAction({
                    value: "Moving Torso Right",
                }))
                setTimeout(() => {
                    store.dispatch(setTorso({
                        value: "right"
                    }))
                    endAtomic();
                    if (store.getState().robotVariable.behaviorScheduled !== "ContinueWatchTV") {
                        return;
                    }
                    startAtomic();
                    store.dispatch(setAction({
                        value: "Moving Torso Back",
                    }))
                    setTimeout(() => {
                        store.dispatch(setTorso({
                            value: "back"
                        }));
                        store.dispatch(clearAction());
                        endAtomic();
                        if (store.getState().robotVariable.behaviorScheduled !== "ContinueWatchTV") {
                            return;
                        }
                        setGUI("ReturnHome", "Continue");
                    }, 5000)
                }, 5000)
            }
        }
        afterMove();
    }, timeout_tray);
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

const setGUI = (gui1 = null, gui2 = null, gui3 = null) => {
    store.dispatch(clearGUI());
    store.dispatch(setGUI1({
        value: gui1,
    }))
    store.dispatch(setGUI2({
        value: gui2,
    }))
    store.dispatch(setGUI3({
        value: gui3,
    }))
}

const startUninterruptible = () => {
    store.dispatch(setUninterruptibleRunning({
        value: true,
    }))
}

const endUninterruptible = () => {
    store.dispatch(setUninterruptibleRunning({
        value: false,
    }))
}

const startAtomic = () => {
    store.dispatch(setAtomicRunning({
        value: true,
    }))
}

const endAtomic = () => {
    store.dispatch(setAtomicRunning({
        value: false,
    }))
}