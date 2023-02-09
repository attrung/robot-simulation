import { AlertFridgeDoorCondition, RemindFridgeDoorCondition } from './BehaviorsConditions';
import { AlertFridgeDoor, RemindFridgeDoor } from './Behaviors';

export const runScheduler = (map, robot) => {
    if (AlertFridgeDoorCondition()) {
        AlertFridgeDoor(map, robot)
        return;
    }

    if (RemindFridgeDoorCondition()) {
        console.log("This ran");
        RemindFridgeDoor()
        return;
    }
}