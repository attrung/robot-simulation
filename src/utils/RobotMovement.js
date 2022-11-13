var moved = false;

export function moveAtoB(canvas, idx, height, width){
    if (moved) {
        return
    } else {
        moved = true;
    }
    canvas.item(idx).animate('top', height * 0.48, {
        duration: 3000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            canvas.item(idx).animate('left', width * 0.38, {
                duration: 3000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    canvas.item(idx).animate('top', height * 0.88, {
                        duration: 3000,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete: () => {
                            moved = false;
                            moveBtoA(canvas, idx, height, width);
                        }
                    })
                }
        })},
    })
}

export function moveBtoA(canvas, idx, height, width) {
    if (moved) {
        return
    } else {
        moved = true;
    }
    canvas.item(idx).animate('top', height * 0.48, {
        duration: 3000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
            canvas.item(idx).animate('left', width * 0.10, {
                duration: 3000,
                onChange: canvas.renderAll.bind(canvas),
                onComplete: () => {
                    canvas.item(idx).animate('top', height*0.10, {
                        duration: 3000,
                        onChange: canvas.renderAll.bind(canvas),
                        onComplete: () => {
                            moved = false;
                            moveAtoB(canvas, idx, height, width);
                        }
                    })
                }
        })},
    })
}