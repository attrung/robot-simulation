import { store } from '../app/store';
import { AlertFridgeDoorCondition, AnswerDoorbellCondition, CheckBellCondition, ContinueWatchTVCondition, GoToKitchenCondition, GoToSofaCondition, GoToTableCondition, KitchenAwaitCommandCondition, Med5PMCondition, Med5PMRemindCondition, Med5PMResetCondition, RemindFridgeDoorCondition, ReturnHomeCondition, SofaAwaitCommandCondition, TableAwaitCommandCondition, TMedicineCondition, UncheckBellCondition, WaitHereCondition, WatchTVCondition } from './BehaviorsConditions';
import { AlertFridgeDoor, AnswerDoorbell, CheckBell, ContinueWatchTV, GoToKitchen, GoToSofa, GoToTable, KitchenAwaitCommand, Med5PM, Med5PMRemind, Med5PMReset, RemindFridgeDoor, ReturnHome, SofaAwaitCommand, TableAwaitCommand, TMedicine, UncheckBell, WaitHere, WatchTV } from './Behaviors';
import { setBehaviorScheduled } from '../features/robotVariableSlice';

export const runScheduler = (map, robot) => {
    if (store.getState().robotVariable.uninterruptibleRunning) {
        return;
    }

    // Priority 90
    if (Med5PMResetCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "Med5PMReset") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "Med5PMReset"
        }))
        schedule(Med5PMReset, "Med5PMReset");
        return;
    }

    // Priority 80
    if (CheckBellCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "CheckBell") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "CheckBell",
        }))
        schedule(CheckBell, "CheckBell");
        return;
    }

    if (UncheckBellCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "UncheckBell") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "UncheckBell",
        }))
        schedule(UncheckBell, "UncheckBell");
        return;
    }

    if (RemindFridgeDoorCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "RemindFridgeDoor") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "RemindFridgeDoor"
        }))
        schedule(RemindFridgeDoor, "RemindFridgeDoor");
        return;
    }

    // Priority 70
    if (AnswerDoorbellCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "AnswerDoorbell") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "AnswerDoorbell"
        }))
        schedule(AnswerDoorbell, "AnswerDoorbell");
        return;
    }

    // Priority 60
    if (AlertFridgeDoorCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "AlertFridgeDoor") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "AlertFridgeDoor"
        }))
        schedule(() => AlertFridgeDoor(map, robot), "AlertFridgeDoor");
        return;
    }

    // Priority 50
    if (Med5PMCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "Med5PM") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "Med5PM"
        }))
        schedule(() => Med5PM(map, robot), "Med5PM");
        return;
    }

    if (Med5PMRemindCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "Med5PMRemind") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "Med5PMRemind"
        }))
        schedule(() => Med5PMRemind(map, robot), "Med5PMRemind");
        return;
    }

    // Priority 40
    if (GoToKitchenCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "GoToKitchen") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "GoToKitchen",
        }))
        schedule(() => GoToKitchen(map, robot), "GoToKitchen");
        return;
    }

    if (GoToSofaCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "GoToSofa") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "GoToSofa",
        }))
        schedule(() => GoToSofa(map, robot), "GoToSofa");
        return;
    }

    if (GoToTableCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "GoToTable") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "GoToTable",
        }))
        schedule(() => GoToTable(map, robot), "GoToTable");
        return;
    }

    if (KitchenAwaitCommandCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "KitchenAwaitCommand") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "KitchenAwaitCommand",
        }))
        schedule(KitchenAwaitCommand, "KitchenAwaitCommand");
        return;
    }

    if (SofaAwaitCommandCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "SofaAwaitCommand") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "SofaAwaitCommand",
        }))
        schedule(SofaAwaitCommand, "SofaAwaitCommand");
        return;
    }

    if (TableAwaitCommandCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "TableAwaitCommand") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "TableAwaitCommand",
        }))
        schedule(TableAwaitCommand, "TableAwaitCommand");
        return;
    }

    if (ReturnHomeCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "ReturnHome") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "ReturnHome",
        }))
        schedule(() => ReturnHome(map, robot), "ReturnHome");
        return;
    }

    if (WaitHereCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "WaitHere") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "WaitHere",
        }))
        schedule(() => WaitHere(), "WaitHere");
        return;
    }

    // Priority 35
    if (ContinueWatchTVCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "ContinueWatchTV") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "ContinueWatchTV"
        }))
        schedule(() => ContinueWatchTV(map, robot), "ContinueWatchTV");
        return;
    }

    // Priority 30
    if (WatchTVCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "WatchTV") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "WatchTV"
        }))
        schedule(() => WatchTV(map, robot), "WatchTV");
        return;
    }

    // Priority 0
    if (TMedicineCondition()) {
        store.dispatch(setBehaviorScheduled({
            value: "TMedicine"
        }))
        schedule(() => TMedicine(map, robot), "TMedicine");
        return;
    }

    store.dispatch(setBehaviorScheduled({
        value: null,
    }))
}

const schedule = (to_run, name) => {
    const waitAtomic = () => {
        if (store.getState().robotVariable.atomicRunning) {
            setTimeout(waitAtomic, 100);
        } else {
            if (store.getState().robotVariable.behaviorScheduled === name) {
                setTimeout(() => {
                    if (store.getState().robotVariable.behaviorScheduled === name) {
                        to_run();
                    }
                }, 100)
            }
        }
    }
    waitAtomic();
}