import { store } from '../app/store';
import { AlertFridgeDoorCondition, ContinueWatchTVCondition, LowerTrayCondition, Med5PMCondition, Med5PMRemindCondition, Med5PMResetCondition, RemindFridgeDoorCondition, WatchTVCondition } from './BehaviorsConditions';
import { AlertFridgeDoor, ContinueWatchTV, LowerTray, Med5PM, Med5PMRemind, Med5PMReset, RemindFridgeDoor, watchTV } from './Behaviors';

export const runScheduler = (map, robot) => {
    if (store.getState().robotVariable.uninterruptibleRunning) {
        return;
    }

    // Priority 90
    if (Med5PMResetCondition()) {
        Med5PMReset();
        return;
    }

    // Priority 80
    if (RemindFridgeDoorCondition()) {
        RemindFridgeDoor();
        return;
    }


    // Priority 60
    if (AlertFridgeDoorCondition()) {
        AlertFridgeDoor(map, robot);
        return;
    }

    // Priority 50
    if (Med5PMCondition()) {
        Med5PM(map, robot)
        return;
    }

    if (Med5PMRemindCondition()) {
        Med5PMRemind(map, robot);
        return;
    }

    // Priority 35
    if (ContinueWatchTVCondition()) {
        ContinueWatchTV(map, robot);
        return;
    }

    // Priority 30
    if (WatchTVCondition()) {
        watchTV(map, robot);
        return;
    }

    // Priority 0
    if (LowerTrayCondition()) {
        LowerTray();
        return;
    }

}