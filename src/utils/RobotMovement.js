import { fabric} from 'fabric';
import {store} from '../app/store';
import {setRobotCoordinate, setIsMoving, setHallCoordinate, setDiningAreaCoordinate, setTvCoordinate, setSofaCoordinate, setKitchenCoordinate, setBathroomCoordinate, setOfficeCoordinate, setBedroomCoordinate } from '../features/movementSlice';

export function generateMovementMap(height, width) {
    // hall
    const h1 = [width * 0.05, height * 0.2];
    const h2 = [width * 0.05, height * 0.27];
    store.dispatch(setHallCoordinate({coordinate: h2}));
    // dining area
    const da1 = [width * 0.15, height * 0.27];
    const da2 = [width * 0.20, height * 0.27];
    const da3 = [width * 0.20, height * 0.15];
    const da4 = [width * 0.20, height * 0.03];
    store.dispatch(setDiningAreaCoordinate({coordinate: da3}));
    // living room
    const lr1 = [width * 0.265, height * 0.27];
    const lr2 = [width * 0.265, height * 0.15];
    const lr3 = [width * 0.265, height * 0.03];
    const lr4 = [width * 0.33, height * 0.18];
    store.dispatch(setTvCoordinate({coordinate: lr4}));
    const lr5 = [width * 0.46, height * 0.18];
    store.dispatch(setSofaCoordinate({coordinate: lr5}));
    // walking hall
    const wh1 = [width * 0.192, height * 0.35];
    const wh2 = [width * 0.192, height * 0.445];
    const wh3 = [width * 0.192, height * 0.52];
    const wh4 = [width * 0.192, height * 0.72];
    const wh5 = [width * 0.255, height * 0.52];

    // kitchen
    const k1 = [width * 0.125, height * 0.445];
    const k2 = [width * 0.075, height * 0.52];
    store.dispatch(setKitchenCoordinate({coordinate: k2}));

    // bathroom
    const b1 = [width * 0.10, height * 0.72];
    store.dispatch(setBathroomCoordinate({coordinate: b1}));

    //office
    const o1 = [width * 0.27, height * 0.72];
    store.dispatch(setOfficeCoordinate({coordinate: o1}));

    // bedroom
    const be1 = [width * 0.325, height * 0.52];
    const be2 = [width * 0.40, height * 0.52];
    store.dispatch(setBedroomCoordinate({coordinate: be2}));

    const movableLocations = [
        h1,
        h2,
        da1,
        da2,
        da3,
        da4,
        lr1,
        lr2,
        lr3,
        lr4,
        lr5,
        wh1,
        wh2,
        k1,
        k2,
        wh3,
        wh4,
        b1,
        o1,
        wh5,
        be1,
        be2
    ]
    const movableEdges = [
        [h1,h2],
        [h2,da1],
        [da1,da2],
        [da2,lr1],
        [da2,da3],
        [da3,da4],
        [da4,lr3],
        [da3,lr2],
        [lr1,lr2],
        [lr2,lr3],
        [lr1,lr4],
        [lr2,lr4],
        [lr4,lr5],
        [da1,wh1],
        [da2,wh1],
        [wh1,wh2],
        [wh2,wh3],
        [wh3,wh4],
        [wh2,k1],
        [k1,k2],
        [wh4,b1],
        [o1,wh4],
        [wh3,wh5],
        [wh5,be1],
        [be1,be2],
    ]
    return [movableLocations, movableEdges]
}

function getClosestCoordinate(x, y){
    const movableCoordinates = store.getState().robot.movableCoordinates;
    var answer = null;
    var minDist = Number.POSITIVE_INFINITY;
    movableCoordinates.forEach(element => {
        const dist = Math.pow(element[0] - x, 2) + Math.pow(element[1] - y, 2);
        if (dist < minDist) {
            minDist = dist;
            answer = element;
        }
    });
    return answer;
}

function getPath(x1, y1, x2, y2) {
    const movableCoordinates = store.getState().robot.movableCoordinates;
    const movableEdges = store.getState().robot.movableEdges;
    const edgeMap = new Map();
    var start_node = getClosestCoordinate(x1, y1);
    var end_node = getClosestCoordinate(x2, y2);
    movableCoordinates.forEach(coordinate => {
        edgeMap.set(coordinate, []);
    })

    movableEdges.forEach(element => {
        edgeMap.get(element[0]).push(element[1]);
        edgeMap.get(element[1]).push(element[0]);
    })

    var queue = [];
    queue.push([start_node, [start_node]]);
    var seen = new Set();

    while (!(queue.length === 0)) {
        const [node, path] = queue.shift();
        if (node === end_node){
            return path;
        }
        edgeMap.get(node).forEach(new_node => {
            if (seen.has(new_node)){
            } else {
                seen.add(new_node);
                queue.push([new_node, [...path, new_node]]);
            }
        })
    }
}

export function moveRobot(canvas, robot, x2, y2) {
    const robotCoordinate = store.getState().robot.currentCoordinate;
    const path = getPath(robotCoordinate[0], robotCoordinate[1], x2, y2);
    animateMovement(canvas, robot, path);
}

function animateMovement(canvas, robot, path){
    store.dispatch(setIsMoving({isMoving: true}));
    if (path.length === 0){
        store.dispatch(setIsMoving({isMoving: false}));
        return;
    }
    const robotCoordinate = store.getState().robot.currentCoordinate;
    const node = path.shift();
    const dist = Math.sqrt(Math.pow(robotCoordinate[0] - node[0], 2) + Math.pow(robotCoordinate[1] - node[1], 2));
    robot.animate({
        'top': node[1] - 10,
        'left': node[0] - 8,
        },
        {
        duration: dist * 50 / (Math.max(store.getState().time.multiplier, 1)),
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeOutCubic(),
        onComplete: () => {
            store.dispatch(setRobotCoordinate({x: node[0], y: node[1]}));
            animateMovement(canvas, robot, path);
        },
    })
}