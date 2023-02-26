import { store } from '../app/store';
import { setColourWhite, setColourYellow, setSpeakText, clearSpeakText, setAction, clearAction, setTorso, setGUI1, clearGUI, setGUI2, setGUI3, setGUI4 } from '../features/robotUISlice';
import { setGOALgoToCharger, setGOALgoToTable, setGOALgoToSofa, setGOALfridgeUserAlerted, setGOALwatchTV, setGOALwaitHere, setGOALgoToKitchen, setGOALwaitAtKitchen, setGOALwaitAtSofa, setGOALwaitAtTable, setGOALanswerDoorBell } from '../features/goalVariableSlice';
import { moveRobotRoom } from '../utils/RobotMovement';
import { clearBehaviorRunning, setAtomicRunning, setBehaviorRunning, setMedicineDue5PM, setMedicineReminder5PM, setTrayIsEmpty, setTrayIsLowered, setTrayIsRaised, setUninterruptibleRunning } from '../features/robotVariableSlice';
import { LowerTrayCondition, RaiseTrayCondition } from './BehaviorsConditions';

// Helper with Trays
export const LowerTray = () => {
    if (store.getState().robotVariable.behaviorRunning === "LowerTray") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "LowerTray"
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

export const RaiseTray = () => {
    if (store.getState().robotVariable.behaviorRunning === "RaiseTray") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "RaiseTray"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    store.dispatch(setAction({
        value: "Raising Tray",
    }))
    setTimeout(() => {
        store.dispatch(clearAction());
        store.dispatch(setColourWhite());
        store.dispatch(setTrayIsRaised({
            value: true,
            time: store.getState().time.currentTime,
        }))
        store.dispatch(setTrayIsLowered({
            value: false,
            time: store.getState().time.currentTime,
        }))
        endAtomic();
        endUninterruptible();
    }, 5000);
}

// Main Behaviours
export const AlertFridgeDoor = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "AlertFridgeDoor") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "AlertFridgeDoor"
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
                store.dispatch(clearBehaviorRunning());
            }, 5000);
        }
    }
    afterMove();
}

export const RemindFridgeDoor = () => {
    if (store.getState().robotVariable.behaviorRunning === "RemindFridgeDoor") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "RemindFridgeDoor"
    }))
    store.dispatch(setGOALfridgeUserAlerted({
        value: false,
        time: store.getState().time.currentTime,
    }))
    endUninterruptible();
    store.dispatch(clearBehaviorRunning());
}

export const Med5PMReset = () => {
    if (store.getState().robotVariable.behaviorRunning === "Med5PMReset") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "Med5PMReset"
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
    store.dispatch(clearBehaviorRunning());
}

export const Med5PMRemind = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "Med5PMRemind") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "Med5PMRemind"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            endAtomic();
            if (store.getState().robotVariable.behaviorScheduled !== "Med5PMRemind") {
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
                store.dispatch(clearBehaviorRunning());
            }, 5000);
        }
    }
    afterMove();
}

export const Med5PM = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "Med5PM") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "Med5PM"
    }))
    store.dispatch(setColourYellow());
    startAtomic();
    moveRobotRoom(map, robot, 'sofa');
    const afterMove = () => {
        if (store.getState().movement.isMoving) {
            setTimeout(afterMove, 100);
        } else {
            endAtomic();
            if (store.getState().robotVariable.behaviorScheduled !== "Med5PM") {
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
                store.dispatch(clearBehaviorRunning());
            }, 5000);
        }
    }
    afterMove();
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
                    store.dispatch(clearBehaviorRunning());
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

export const AnswerDoorbell = () => {
    if (store.getState().robotVariable.behaviorRunning === "AnswerDoorbell") {
        return;
    }
    startUninterruptible();
    store.dispatch(setBehaviorRunning({
        value: "AnswerDoorbell"
    }))
    startAtomic();
    store.dispatch(setSpeakText({
        value: "Doorbell"
    }))
    setTimeout(() => {
        store.dispatch(clearSpeakText());
        endAtomic();
        startAtomic();
        store.dispatch(setAction({
            value: "Waiting for 5 seconds",
        }))
        setTimeout(() => {
            endAtomic();
            endUninterruptible();
            store.dispatch(clearBehaviorRunning());
        }, 5000)
    }, 5000);
}

export const CheckBell = () => {
    store.dispatch(setBehaviorRunning({
        value: "CheckBell"
    }))
    store.dispatch(setGOALanswerDoorBell({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const UncheckBell = () => {
    store.dispatch(setBehaviorRunning({
        value: "UncheckBell"
    }))
    store.dispatch(setGOALanswerDoorBell({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const SetContinue = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetContinue"
    }))
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwatchTV({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const SetGoToKitchen = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetGoToKitchen"
    }))
    store.dispatch(setGOALgoToKitchen({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(setGOALwaitHere({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const GoToKitchen = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "GoToKitchen") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "GoToKitchen"
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
        if (store.getState().robotVariable.behaviorScheduled !== "GoToKitchen") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'kitchen');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "GoToKitchen") {
                    return;
                }
                if (RaiseTrayCondition()) {
                    timeout_tray = 5000;
                    startAtomic();
                    store.dispatch(setAction({
                        value: "Raising Tray",
                    }))
                }
                setTimeout(() => {
                    store.dispatch(clearAction());
                    store.dispatch(setTrayIsRaised({
                        value: true,
                        time: store.getState().time.currentTime,
                    }))
                    store.dispatch(setTrayIsLowered({
                        value: false,
                        time: store.getState().time.currentTime,
                    }))
                    endAtomic();
                    store.dispatch(setColourWhite());
                    store.dispatch(setGOALgoToKitchen({
                        value: false,
                        time: store.getState().time.currentTime,
                    }))
                    store.dispatch(setGOALwaitAtKitchen({
                        value: true,
                        time: store.getState().time.currentTime,
                    }))
                    store.dispatch(clearBehaviorRunning());
                }, timeout_tray)
            }
        }
        afterMove();
    }, timeout_tray);
}

export const KitchenAwaitCommand = () => {
    store.dispatch(setBehaviorRunning({
        value: "KitchenAwaitCommand"
    }))
    setGUI("GoToSofa", "GoToTable", "Continue", "WaitHere");
    store.dispatch(setGOALwaitAtKitchen({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const SetGoToSofa = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetGoToSofa"
    }))
    store.dispatch(setGOALgoToSofa({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const GoToSofa = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "GoToSofa") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "GoToSofa"
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
        if (store.getState().robotVariable.behaviorScheduled !== "GoToSofa") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'sofa');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "GoToSofa") {
                    return;
                }
                store.dispatch(setColourWhite());
                store.dispatch(setGOALgoToSofa({
                    value: false,
                    time: store.getState().time.currentTime,
                }));
                store.dispatch(setGOALwaitAtSofa({
                    value: true,
                    time: store.getState().time.currentTime,
                }))
                store.dispatch(clearBehaviorRunning());
            }
        }
        afterMove();
    }, timeout_tray);
}

export const SofaAwaitCommand = () => {
    store.dispatch(setBehaviorRunning({
        value: "SofaAwaitCommand"
    }))
    setGUI("ReturnHome", "WaitHere", "Continue");
    store.dispatch(setGOALwaitAtSofa({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const SetGoToTable = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetGoToTable"
    }))
    store.dispatch(setGOALgoToTable({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const GoToTable = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "GoToTable") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "GoToSofa"
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
        if (store.getState().robotVariable.behaviorScheduled !== "GoToTable") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'diningArea');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "GoToTable") {
                    return;
                }
                store.dispatch(setColourWhite());
                store.dispatch(setGOALgoToTable({
                    value: false,
                    time: store.getState().time.currentTime,
                }));
                store.dispatch(setGOALwaitAtTable({
                    value: true,
                    time: store.getState().time.currentTime,
                }))
                store.dispatch(clearBehaviorRunning());
            }
        }
        afterMove();
    }, timeout_tray);
}

export const TableAwaitCommand = () => {
    store.dispatch(setBehaviorRunning({
        value: "TableAwaitCommand"
    }))
    setGUI("ReturnHome", "WaitHere", "Continue");
    store.dispatch(setGOALwaitAtTable({
        value: false,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const SetReturnHome = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetReturnHome"
    }))
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
    store.dispatch(clearBehaviorRunning());
}

export const ReturnHome = (map, robot) => {
    if (store.getState().robotVariable.behaviorRunning === "ReturnHome") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "ReturnHome"
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
        if (store.getState().robotVariable.behaviorScheduled !== "ReturnHome") {
            return;
        }
        startAtomic();
        moveRobotRoom(map, robot, 'charger');
        const afterMove = () => {
            if (store.getState().movement.isMoving) {
                setTimeout(afterMove, 100);
            } else {
                endAtomic();
                if (store.getState().robotVariable.behaviorScheduled !== "ReturnHome") {
                    return;
                }
                store.dispatch(setColourWhite());
                store.dispatch(setGOALgoToCharger({
                    value: false,
                    time: store.getState().time.currentTime,
                }));
                store.dispatch(clearBehaviorRunning());
            }
        }
        afterMove();
    }, timeout_tray);
}

export const SetWaitHere = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetWaitHere"
    }))
    store.dispatch(setGOALwaitHere({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const WaitHere = () => {
    if (store.getState().robotVariable.behaviorRunning === "WaitHere") {
        return;
    }
    store.dispatch(setBehaviorRunning({
        value: "WaitHere"
    }))
    startAtomic();
    store.dispatch(setColourWhite());
    setTimeout(() => {
        store.dispatch(setColourYellow());
        setTimeout(() => {
            store.dispatch(setColourWhite());
            endAtomic();
            if (store.getState().robotVariable.behaviorRunning !== "WaitHere") {
                return;
            }
            setGUI("WaitHere", "ReturnHome", "Continue");
            store.dispatch(clearBehaviorRunning());
        }, 1000)
    }, 1000)
}

export const SetWatchTV = () => {
    store.dispatch(setBehaviorRunning({
        value: "SetWatchTV"
    }))
    store.dispatch(setGOALwatchTV({
        value: true,
        time: store.getState().time.currentTime,
    }))
    store.dispatch(clearBehaviorRunning());
}

export const ResetAllGoals = () => {
    store.dispatch(setBehaviorRunning({
        value: "ResetAllGoals"
    }))
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
    store.dispatch(clearBehaviorRunning());
}

const setGUI = (gui1 = null, gui2 = null, gui3 = null, gui4 = null) => {
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
    store.dispatch(setGUI4({
        value: gui4,
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