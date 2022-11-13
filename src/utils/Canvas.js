import { fabric} from 'fabric';

export const initCanvas = (height, width) => {
    const canvas = new fabric.StaticCanvas('canvas', {
        height: height*0.98,
        width: width * 0.49,
    })
    const robot = new fabric.Triangle({ top: height*0.10, left: width*0.10, width: height * 0.03, height: height*0.03, fill: 'blue' })
    const wall1 = new fabric.Rect({
        left: 0.245 * width,
        top: 0,
        fill: 'black',
        width: 3,
        height: height*0.40,
    });
    const wall2 = new fabric.Rect({
        left: 0.245 * width,
        top: height * 0.58,
        fill: 'black',
        width: 3,
        height: height*0.40,
    });
    canvas.add(robot); canvas.add(wall1); canvas.add(wall2);
    return canvas;
};