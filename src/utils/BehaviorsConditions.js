import { store } from '../app/store';

export const LowerTrayCondition = () => {
    if (
        store.getState().robotVariable.trayIsRaised === true &&
        store.getState().robotVariable.trayIsEmpty === true
    ) {
        return true;
    }
    return false;
}

export const RaiseTrayCondition = () => {
    if (
        store.getState().robotVariable.trayIsLowered === true
    ) {
        return true;
    }
    return false;
}

export const AlertFridgeDoorCondition = () => {
    if (
        store.getState().sensor.fridgeOpen &&
        store.getState().time.currentTime - store.getState().sensor.fridgeOnTime >= 30 &&
        store.getState().goalVariable.GOALfridgeUserAlerted === false) {
        return true;
    }
    return false;
}

export const RemindFridgeDoorCondition = () => {
    if (
        store.getState().goalVariable.GOALfridgeUserAlerted === true &&
        store.getState().time.currentTime - store.getState().goalVariable.GOALfridgeUserAlertedOnTime >= 300
    ) {
        return true;
    }
    return false;
}

export const Med5PMResetCondition = () => {
    if (
        store.getState().time.currentTime >= 0 &&
        store.getState().time.currentTime < 17 * 3600 &&
        store.getState().robotVariable.medicineDue5PM === false
    ) {
        return true;
    }
    return false;
}

export const Med5PMRemindCondition = () => {
    if (
        store.getState().robotVariable.medicineReminder5PM === true &&
        store.getState().time.currentTime - store.getState().robotVariable.medicineReminder5PMOnTime >= 60
    ) {
        return true;
    }
    return false;
}

export const Med5PMCondition = () => {
    if (
        store.getState().time.currentTime >= 17 * 3600 &&
        store.getState().robotVariable.medicineDue5PM === true
    ) {
        return true;
    }
    return false;
}

export const WatchTVCondition = () => {
    if (
        store.getState().sensor.sofaSeated &&
        store.getState().sensor.tvOn &&
        store.getState().goalVariable.GOALwatchTV === false &&
        store.getState().time.currentTime - store.getState().goalVariable.GOALwatchTVOnTime > 3600
    ) {
        return true;
    }
    return false
}

export const ContinueWatchTVCondition = () => {
    if (
        store.getState().goalVariable.GOALwatchTV === true &&
        store.getState().sensor.tvOn === true
    ) {
        return true;
    }
    return false;
}

export const AnswerDoorbellCondition = () => {
    if (
        store.getState().goalVariable.GOALanswerDoorBell === true
    ) {
        return true;
    }
    return false;
}

export const CheckBellCondition = () => {
    if (
        store.getState().sensor.bellRang
    ) {
        return true;
    }
    return false;
}

export const UncheckBellCondition = () => {
    if (
        store.getState().goalVariable.GOALanswerDoorBell === true &&
        store.getState().time.currentTime - store.getState().goalVariable.GOALanswerDoorBellOnTime >= 10
    ) {
        return true;
    }
    return false;
}

export const GoToKitchenCondition = () => {
    if (
        store.getState().goalVariable.GOALgoToKitchen === true
    ) {
        return true;
    }
    return false;
}

export const GoToSofaCondition = () => {
    if (
        store.getState().goalVariable.GOALgoToSofa === true
    ) {
        return true;
    }
    return false;
}

export const GoToTableCondition = () => {
    if (
        store.getState().goalVariable.GOALgoToTable === true
    ) {
        return true;
    }
    return false;
}

export const KitchenAwaitCommandCondition = () => {
    if (
        store.getState().movement.currentCoordinate[0] === store.getState().movement.kitchenCoordinate[0] &&
        store.getState().movement.currentCoordinate[1] === store.getState().movement.kitchenCoordinate[1] &&
        store.getState().goalVariable.GOALwaitAtKitchen === true
    ) {
        return true;
    }
    return false;
}

export const SofaAwaitCommandCondition = () => {
    if (
        store.getState().movement.currentCoordinate[0] === store.getState().movement.sofaCoordinate[0] &&
        store.getState().movement.currentCoordinate[1] === store.getState().movement.sofaCoordinate[1] &&
        store.getState().goalVariable.GOALwaitAtSofa === true
    ) {
        return true;
    }
    return false;
}

export const TableAwaitCommandCondition = () => {
    if (
        store.getState().movement.currentCoordinate[0] === store.getState().movement.diningAreaCoordinate[0] &&
        store.getState().movement.currentCoordinate[1] === store.getState().movement.diningAreaCoordinate[1] &&
        store.getState().goalVariable.GOALwaitAtTable === true
    ) {
        return true;
    }
    return false;
}

export const ReturnHomeCondition = () => {
    if (
        store.getState().goalVariable.GOALgoToCharger === true
    ) {
        return true;
    }
    return false;
}

export const WaitHereCondition = () => {
    if (
        store.getState().goalVariable.GOALwaitHere === true
    ) {
        return true;
    }
    return false;
}