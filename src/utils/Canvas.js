import { fabric} from 'fabric';
import {store} from '../app/store';
import {
    toggleFridgeOpen
} from '../features/sensorSlice';

export const initCanvas = (height, width) => {
    const canvas = new fabric.Canvas('mainMap', {
        height: height*0.98,
        width: width * 0.49,
    })
    const robot = new fabric.Triangle({ 
        top: height*0.10, 
        left: width*0.10, 
        width: height * 0.06, 
        height: height*0.06, 
        fill: 'blue',
        selectable: false,
    })
    const wall1 = new fabric.Rect({
        left: 0.245 * width,
        top: 0,
        fill: 'black',
        width: 3,
        height: height*0.40,
        selectable: false,
    });
    const wall2 = new fabric.Rect({
        left: 0.245 * width,
        top: height * 0.58,
        fill: 'black',
        width: 3,
        height: height*0.40,
        selectable: false,
    });
    lockObject(robot); lockObject(wall1); lockObject(wall2);
    canvas.add(robot); canvas.add(wall1); canvas.add(wall2);
    addFridge(canvas, width, height);
    addTV(canvas, width, height);
    addSofa(canvas, width, height);
    addDoorBell(canvas, width, height);
    addChargingPad(canvas, width, height);
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

const addFridge = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://thumbs.dreamstime.com/b/fridge-vector-icon-freezer-illustration-symbol-refrigerator-symbol-logo-web-sites-mobile-fridge-vector-icon-freezer-160724574.jpg", 
        fridge => {
            fridge.scale(0.2);
            lockObject(fridge);
            canvas.add(fridge);
            fridge.on('mousedown', ()=>{
                store.dispatch(toggleFridgeOpen());
            });
        },
        {
            left: 0,
            top: height*0.76,
        }
    )
}

const addTV = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://images.samsung.com/is/image/samsung/assets/global/hq/vd/tvs/tv-buying-guide/what-size-tv-should-i-get/2019-tv-buying-guide-what-size-tv-should-i-get-f02-mo.jpg?$FB_TYPE_A_MO_JPG$",
        tv => {
            tv.scale(0.3).set('flipY', true);
            lockObject(tv);
            canvas.add(tv);
        },
        {
            left: width * 0.3,
            top: height * 0.85,
        }
    )
}

const addSofa = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLJI-xPovOhkC8Q-2rqTpsrG2ebqZhgSEsA&usqp=CAU",
        sofa => {
            sofa.scale(0.5);
            lockObject(sofa);
            canvas.add(sofa);
        },
        {
            left: width * 0.33,
            top: height * 0.6,
        }
    )
}

const addChargingPad = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://media.istockphoto.com/id/1320452985/vector/wireless-charging-icon-vector-artificial-intelligence-collection-for-your-web-design-logo-ui.jpg?s=612x612&w=0&k=20&c=RNvGfzp7jI_0pqp6PtnterE3-euQvNN71a5Fj32g9kU=",
        chargingPad => {
            chargingPad.scale(0.15);
            lockObject(chargingPad);
            canvas.add(chargingPad);
            canvas.sendToBack(chargingPad);
        },
        {
            left: width * 0.01,
            top: height * 0.15,
            selectable: false,
        }
    )
}

const addDoorBell = (canvas, width, height) => {
    fabric.Image.fromURL(
        "https://w7.pngwing.com/pngs/393/870/png-transparent-door-bells-chimes-smart-doorbell-ringtone-android-mobile-app-android-mobile-phones-internet-tones.png",
        doorBell => {
            doorBell.scale(0.15);
            lockObject(doorBell);
            canvas.add(doorBell);
            canvas.sendToBack(doorBell);
        },
        {
            left: width * 0.40,
            top: 0,
        }
    )
}