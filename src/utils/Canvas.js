import { fabric} from 'fabric';
import {store} from '../app/store';
import {
    toggleFridgeOpen,
    toggleTvOn,
    toggleBellRang,
    toggleSofaSeated,
} from '../features/sensorSlice';

export const initCanvas = (height, width) => {
    const canvas = new fabric.Canvas('mainMap', {
        height: height*0.98,
        width: width * 0.49,
    })
    const robot = new fabric.Triangle({ 
        top: height*0.03, 
        left: height*0.48, 
        width: height * 0.045, 
        height: height*0.045, 
        fill: 'blue',
        selectable: false,
    })
    lockObject(robot);
    // 4 outter wall
    addWall(canvas, 0, height * 0.1, height*1, 0);
    addWall(canvas, 0.1 * width, 0.008*height, height*1, 270);
    addWall(canvas, 0, 0.98*height, height*0.68, 270);
    addWall(canvas, 0.486 * width, 0.008*height, height*0.85);
    // Kitchen Wall
    addWall(canvas, 0.1 * width, 0, height*0.25, 0);
    addWall(canvas, 0, height * 0.1, height*0.10, 270);
    addWall(canvas, 0, height * 0.33, height*0.25, 270);
    addWall(canvas, height*0.25, height * 0.32, height*0.1, 0);
    addWall(canvas, height*0.25, height * 0.50, height * 0.1, 0);
    // Bathroom walls
    addWall(canvas, 0, height * 0.60, height*0.33, 270);
    addWall(canvas, height*0.33, height * 0.59, height*0.1, 0);
    addWall(canvas, height*0.33, height * 0.79, height*0.21, 0);
    // Office Walls
    addWall(canvas, height*0.43, height * 0.79, height*0.21, 0);
    addWall(canvas, height*0.43, height * 0.59, height*0.1, 0);
    addWall(canvas, height*0.43, height * 0.60, height*0.25, 270);
    // Bedroom Walls
    addWall(canvas, height*0.68, height * 0.59, height*0.42, 0);
    addWall(canvas, height*0.68, height * 0.86, height*0.25, 270);
    addWall(canvas, height*0.63, height * 0.32, height*0.17, 0);
    addWall(canvas, height*0.63, height * 0.32, height*0.26, 270);
    // Stairs
    addObject(canvas, "https://i.imgur.com/LynnJ65l.png", height*0.43, height * 0.32, 0, 0.45, false);
    // Bathroom objects
    addObject(canvas, "https://i.imgur.com/YdxOssBl.png", height*0.28, height * 0.97, 180, 0.45, false);
    addObject(canvas, "https://i.imgur.com/45kkpGW.png", height*0.02, height * 0.62, 0, 0.45, false);
    // Office objects
    addObject(canvas, "https://i.imgur.com/vZOmH8O.png", height*0.65, height * 0.95, 180, 0.45, false);
    addObject(canvas, "https://i.imgur.com/8l5BfWH.png", height*0.57, height * 0.83, 270, 0.45, false);
    addObject(canvas, "https://i.imgur.com/ptLTBtB.png", height*0.61, height * 0.91, 180, 0.35, false);
    // Bedroom objects
    addObject(canvas, "https://i.imgur.com/k4trs4c.png", height*0.88, height * 0.47, 180, 0.45, false);
    // Kitchen objects
    addObject(canvas, "https://i.imgur.com/pmTI27i.png", height*0.10, height * 0.33, 0, 0.60, false);
    // Dining Area Objects
    addObject(canvas, "https://i.imgur.com/16GHLQm.png", height*0.22, height * 0.03, 0, 0.8, false);
    // House Entrance Door
    addObject(canvas, "https://i.imgur.com/5FSeh4H.png", height*0.095, height * 0.09, 0, 0.4, false);
    
    addText(canvas, "Bathroom", height*0.12, height * 0.82, 0, 0.45);
    addText(canvas, "Office", height*0.53, height * 0.65, 0, 0.45);
    addText(canvas, "Bedroom", height*0.74, height * 0.65, 0, 0.45);
    addText(canvas, "Kitchen", height*0.10, height * 0.45, 0, 0.45);
    addText(canvas, "Dining Area", height*0.25, height * 0.22, 0, 0.45);
    addText(canvas, "Living Room", height*0.68, height * 0.20, 0, 0.45);
    
    addFridge(canvas, width, height);
    addTV(canvas, width, height);
    addSofa(canvas, width, height);
    addDoorBell(canvas, width, height);
    addChargingPad(canvas, width, height);
    canvas.add(robot);
    canvas.selection = false;
    return [canvas, robot];
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

const addObject = (canvas, URL, left, top, angle, scale, selectable) => {
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
            selectable: selectable,
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
        fontSize:20,
    });
    lockObject(txt);
    canvas.add(txt);
}

const addFridge = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/G1IPld5.png", 
        fridge => {
            fridge.scale(0.07);
            lockObject(fridge);
            canvas.add(fridge);
            fridge.on('mousedown', ()=>{
                store.dispatch(toggleFridgeOpen());
            });
        },
        {
            left: 0.01*height,
            top: height*0.47,
        }
    )
}

const addTV = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/2knzd5I.png",
        tv => {
            tv.scale(0.2);
            lockObject(tv);
            canvas.add(tv);
            tv.on('mousedown', ()=>{
                store.dispatch(toggleTvOn());
            });
        },
        {
            left: height * 0.655,
            top: height * 0.248,
        }
    )
}

const addSofa = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://i.imgur.com/YWdDNTL.png",
        sofa => {
            sofa.scale(0.17);
            lockObject(sofa);
            canvas.add(sofa);
            sofa.on('mousedown', ()=>{
                store.dispatch(toggleSofaSeated());
            });
        },
        {
            left: height*0.64,
            top: height * 0.01,
        }
    )
}

const addChargingPad = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://media.istockphoto.com/id/1320452985/vector/wireless-charging-icon-vector-artificial-intelligence-collection-for-your-web-design-logo-ui.jpg?s=612x612&w=0&k=20&c=RNvGfzp7jI_0pqp6PtnterE3-euQvNN71a5Fj32g9kU=",
        chargingPad => {
            chargingPad.scale(0.13);
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
            doorBell.scale(0.3);
            lockObject(doorBell);
            canvas.add(doorBell);
            doorBell.on('mousedown', ()=>{
                store.dispatch(toggleBellRang());
            });
        },
        {
            left: height*0.01,
            top: height*0.1,
        }
    )
}