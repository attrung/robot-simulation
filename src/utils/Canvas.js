import { fabric } from 'fabric';
import { store } from '../app/store';
import { setMovableLocation, setPersonCoordinate, setRobotCoordinate } from '../features/movementSlice';
import {
    toggleFridgeOpen,
    toggleTvOn,
    toggleBellRang,
    toggleSofaSeated,
} from '../features/sensorSlice';
import { generateMovementMap } from './RobotMovement';

export const initCanvas = (height, width) => {
    const [movableCoordinates, movableEdges] = generateMovementMap(height, width);
    store.dispatch(setMovableLocation({
        movableCoordinates: movableCoordinates,
        movableEdges: movableEdges,
    }));
    const canvas = new fabric.Canvas('mainMap', {
        height: height * 0.98,
        width: width * 0.49,
    })

    // Robot
    const robot = new fabric.Triangle({
        top: height * 0.02,
        left: width * 0.26,
        width: width * 0.023,
        height: height * 0.045,
        fill: 'blue',
        selectable: false,
    })
    store.dispatch(setRobotCoordinate({ x: width * 0.26, y: height * 0.02 }));
    lockObject(robot);
    canvas.add(robot);

    // 4 outter wall
    addWall(canvas, 0, height * 0.1, height * 1, 0);
    addWall(canvas, 0.1 * width, 0.007 * height, width * 1, 270);
    addWall(canvas, 0, 0.98 * height, width * 0.40, 270);
    addWall(canvas, 0.487 * width, 0.004 * height, height * 0.85, 0);
    // Kitchen Wall
    addWall(canvas, 0.1 * width, 0, height * 0.25, 0);
    addWall(canvas, 0, height * 0.1, width * 0.10, 270);
    addWall(canvas, 0, height * 0.33, width * 0.13, 270);
    addWall(canvas, width * 0.13, height * 0.323, height * 0.09, 0);
    addWall(canvas, width * 0.13, height * 0.507, height * 0.09, 0);
    // Bathroom walls
    addWall(canvas, 0, height * 0.60, width * 0.17, 270);
    addWall(canvas, width * 0.17, height * 0.593, height * 0.1, 0);
    addWall(canvas, width * 0.17, height * 0.79, height * 0.21, 0);
    // Office Walls
    addWall(canvas, width * 0.22, height * 0.79, height * 0.21, 0);
    addWall(canvas, width * 0.22, height * 0.59, height * 0.1, 0);
    addWall(canvas, width * 0.22, height * 0.597, width * 0.18, 270);
    // Bedroom Walls
    addWall(canvas, width * 0.40, height * 0.59, height * 0.42, 0);
    addWall(canvas, width * 0.40, height * 0.86, width, 270);
    addWall(canvas, width * 0.33, height * 0.316, height * 0.17, 0);
    addWall(canvas, width * 0.33, height * 0.32, width, 270);
    // Stairs
    addObject(canvas, "https://i.imgur.com/LynnJ65l.png", width * 0.24, height * 0.32, 0, width / 4000);
    // Bathroom objects
    addObject(canvas, "https://i.imgur.com/YdxOssBl.png", width * 0.14, height * 0.97, 180, width / 4000);
    addObject(canvas, "https://i.imgur.com/45kkpGW.png", width * 0.01, height * 0.62, 0, width / 4000);
    // Office objects
    addObject(canvas, "https://i.imgur.com/vZOmH8O.png", width * 0.36, height * 0.95, 180, width / 3000, false);
    addObject(canvas, "https://i.imgur.com/8l5BfWH.png", width * 0.32, height * 0.80, 270, width / 4000, false);
    addObject(canvas, "https://i.imgur.com/ptLTBtB.png", width * 0.33, height * 0.90, 180, width / 5000, false);
    // Bedroom objects
    addObject(canvas, "https://i.imgur.com/k4trs4c.png", width * 0.486, height * 0.46, 180, width / 3500, false);
    // Kitchen objects
    addObject(canvas, "https://i.imgur.com/pmTI27i.png", width * 0.04, height * 0.33, 0, width / 2500, false);
    // Dining Area Objects
    addObject(canvas, "https://i.imgur.com/16GHLQm.png", width * 0.11, height * 0.03, 0, width / 2000, false);
    // House Entrance Door
    addObject(canvas, "https://i.imgur.com/5FSeh4H.png", width * 0.05, height * 0.09, 0, width / 4500, false);
    // Texts
    addText(canvas, "Bathroom", width * 0.06, height * 0.82, 0, 0.45);
    addText(canvas, "Office", width * 0.30, height * 0.65, 0, 0.45);
    addText(canvas, "Bedroom", width * 0.425, height * 0.65, 0, 0.45);
    addText(canvas, "Kitchen", width * 0.05, height * 0.45, 0, 0.45);
    addText(canvas, "Dining Area", width * 0.12, height * 0.22, 0, 0.45);
    addText(canvas, "Living Room", width * 0.37, height * 0.20, 0, 0.45);
    addText(canvas, "Hall", width * 0.04, height * 0.23, 0, 0.45);

    // Sensors
    addFridge(canvas, width, height);
    addTV(canvas, width, height);
    addSofa(canvas, width, height);
    addDoorBell(canvas, width, height);
    addChargingPad(canvas, width, height);

    var movementMap = [];
    // movement nodes
    const radius = height / 90;
    movableCoordinates.forEach((coordinate) => {
        const node = createNode(coordinate[0], coordinate[1], radius);
        movementMap.push(node);
    })
    movableEdges.forEach(coordinates => {
        const line = createLine(coordinates[0][0], coordinates[0][1], coordinates[1][0], coordinates[1][1], radius);
        movementMap.push(line);
    })
    const moveMap = new fabric.Group(movementMap, {
        selectable: false,
    })

    // Person
    fabric.Image.fromURL(
        "https://i.imgur.com/YqcGoiD.png",
        person => {
            person.scale(width / 15000);
            canvas.add(person);
            lockObject(person);
            person.lockMovementX = false;
            person.lockMovementY = false;
            person.on('mouseup', (e) => {
                const ptr = canvas.getPointer(e);
                store.dispatch(setPersonCoordinate({ x: ptr.x, y: ptr.y }));
            });
            store.dispatch(setPersonCoordinate({ x: 0.2 * width, y: height * 0.38 }));
        },
        {
            left: 0.2 * width,
            top: height * 0.38,
        }
    )

    canvas.add(moveMap);
    canvas.sendToBack(moveMap);
    canvas.selection = false;
    return [canvas, robot, moveMap];
};

const lockObject = (object) => {
    object.lockMovementX = true;
    object.lockMovementY = true;
    object.lockRotation = true;
    object.lockScalingFlip = true;
    object.lockScalingX = true;
    object.lockScalingY = true;
    object.lockSkewingX = true;
    object.lockSkewingY = true;
    object.lockUniScaling = true;
}

const createNode = (left, top, radius) => {
    const node = new fabric.Circle({
        left: left,
        top: top,
        fill: 'green',
        radius: radius,
        selectable: false,
    });
    lockObject(node);
    return node;
}

const createLine = (start_x, start_y, end_x, end_y, radius) => {
    const line = new fabric.Line(
        [
            start_x + radius,
            start_y + radius,
            end_x + radius,
            end_y + radius
        ], {
        stroke: 'green',
        strokeWidth: 2,
        selectable: false,
    });
    lockObject(line);
    return line;
}

const addWall = (canvas, left, top, length, angle) => {
    const wall = new fabric.Rect({
        left: left,
        top: top,
        fill: 'black',
        width: 6,
        height: length,
        angle: angle,
        selectable: false,
    });
    lockObject(wall);
    canvas.add(wall);
}

const addObject = (canvas, URL, left, top, angle, scale) => {
    fabric.Image.fromURL(
        URL,
        obj => {
            obj.scale(scale);
            lockObject(obj);
            canvas.add(obj);
        },
        {
            left: left,
            top: top,
            selectable: false,
            angle: angle,
        }
    )
}

const addText = (canvas, text, left, top, angle) => {
    const txt = new fabric.Text(text, {
        left: left,
        top: top,
        angle: angle,
        selectable: false,
        fontSize: 20,
    });
    lockObject(txt);
    canvas.add(txt);
}

const addFridge = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/G1IPld5.png",
        fridge => {
            fridge.scale(width / 25000);
            lockObject(fridge);
            canvas.add(fridge);
            fridge.on('mousedown', () => {
                store.dispatch(toggleFridgeOpen({ time: store.getState().time.currentTime }));
            });
        },
        {
            left: 0.01 * width,
            top: height * 0.48,
        }
    )
}

const addTV = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/2knzd5I.png",
        tv => {
            tv.scale(width / 6000);
            lockObject(tv);
            canvas.add(tv);
            tv.on('mousedown', () => {
                store.dispatch(toggleTvOn({ time: store.getState().time.currentTime }));
            });
        },
        {
            left: width * 0.35,
            top: height * 0.23,
        }
    )
}

const addSofa = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/V0CedRC.png",
        sofa => {
            sofa.scale(width / 12000);
            lockObject(sofa);
            canvas.add(sofa);
            sofa.on('mousedown', () => {
                store.dispatch(toggleSofaSeated({ time: store.getState().time.currentTime }));
            });
        },
        {
            left: width * 0.475,
            top: height * 0.01,
            angle: 90,
        }
    )
}

const addChargingPad = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://media.istockphoto.com/id/1320452985/vector/wireless-charging-icon-vector-artificial-intelligence-collection-for-your-web-design-logo-ui.jpg?s=612x612&w=0&k=20&c=RNvGfzp7jI_0pqp6PtnterE3-euQvNN71a5Fj32g9kU=",
        chargingPad => {
            chargingPad.scale(width / 15000);
            lockObject(chargingPad);
            canvas.add(chargingPad);
            canvas.sendToBack(chargingPad);
        },
        {
            left: width * 0.25,
            top: height * 0.01,
            selectable: false,
        }
    )
}

const addDoorBell = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/rj0gySp.png",
        doorBell => {
            doorBell.scale(width / 6000);
            lockObject(doorBell);
            canvas.add(doorBell);
            doorBell.on('mousedown', () => {
                store.dispatch(toggleBellRang({ time: store.getState().time.currentTime }));
            });
        },
        {
            left: width * 0.005,
            top: height * 0.1,
        }
    )
}