import {AlertFridgeDoorCondition} from './BehaviorsConditions';
import {AlertFridgeDoor} from './Behaviors';

export const runScheduler = (map, robot) => {
    if (AlertFridgeDoorCondition()) {
        AlertFridgeDoor(map, robot)
        return;
    }
}