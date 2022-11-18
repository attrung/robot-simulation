var moved = false;

export function moveAtoB(canvas, robot, height, width){
    if (moved) {
        return
    } else {
        moved = true;
    }
    robot.animate('top', height * 0.48, {
        duration: 3000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            robot.animate('left', width * 0.38, {
                duration: 3000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    robot.animate('top', height * 0.88, {
                        duration: 3000,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete: () => {
                            moved = false;
                        }
                    })
                }
        })},
    })
}

export function moveBtoA(canvas, robot, height, width) {
    if (moved) {
        return
    } else {
        moved = true;
    }
    robot.animate('top', height * 0.48, {
        duration: 3000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            robot.animate('left', width * 0.10, {
                duration: 3000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    robot.animate('top', height*0.10, {
                        duration: 3000,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete: () => {
                            moved = false;
                        }
                    })
                }
        })},
    })
}