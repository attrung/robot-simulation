import { store } from '../app/store';
import { AlertFridgeDoorCondition, ContinueWatchTVCondition, LowerTrayCondition, Med5PMCondition, Med5PMRemindCondition, Med5PMResetCondition, RemindFridgeDoorCondition, WatchTVCondition } from './BehaviorsConditions';
import { AlertFridgeDoor, ContinueWatchTV, LowerTray, Med5PM, Med5PMRemind, Med5PMReset, RemindFridgeDoor, WatchTV } from './Behaviors';
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
        schedule(Med5PMReset);
        return;
    }

    // Priority 80
    if (RemindFridgeDoorCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "RemindFridgeDoor") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "RemindFridgeDoor"
        }))
        schedule(RemindFridgeDoor);
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
        schedule(() => AlertFridgeDoor(map, robot));
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
        schedule(() => Med5PM(map, robot));
        return;
    }

    if (Med5PMRemindCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "Med5PMRemind") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "Med5PMRemind"
        }))
        schedule(() => Med5PMRemind(map, robot));
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
        schedule(() => ContinueWatchTV(map, robot));
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
        schedule(() => WatchTV(map, robot));
        return;
    }

    // Priority 0
    if (LowerTrayCondition()) {
        if (store.getState().robotVariable.behaviorScheduled === "LowerTray") {
            return;
        }
        store.dispatch(setBehaviorScheduled({
            value: "LowerTray"
        }))
        schedule(() => LowerTray());
        return;
    }

}

const schedule = (to_run) => {
    const waitAtomic = () => {
        if (store.getState().robotVariable.atomicRunning) {
            setTimeout(waitAtomic, 100);
        } else {
            to_run();
        }
    }
    waitAtomic();
}