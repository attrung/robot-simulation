import React from 'react';
import Box from '@mui/material/Box';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Map = () => {
  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '98vh' }}>
         <Box sx={{ ...commonStyles, border: 1 }}>
          <canvas id="canvas" />
         </Box>
     </Box>
  );
}

// export const Map = () => {
//     const { height, width } = useWindowDimensions();
//     const canvasEl = useRef(null);
//     useEffect(() => {
//         const canvas = new fabric.StaticCanvas(canvasEl.current, 'c');
        // const robot = new fabric.Triangle({ top: height*0.10, left: width*0.10, width: height * 0.03, height: height*0.03, fill: 'blue' })
        // const wall1 = new fabric.Rect({
        //     left: 0.245 * width,
        //     top: 0,
        //     fill: 'black',
        //     width: 3,
        //     height: height*0.40,
        // });
        // const wall2 = new fabric.Rect({
        //     left: 0.245 * width,
        //     top: height * 0.58,
        //     fill: 'black',
        //     width: 3,
        //     height: height*0.40,
        // });
        // canvas.add(robot); canvas.add(wall1); canvas.add(wall2);
//         // make the fabric.Canvas instance available to your app
//         updateCanvasContext(canvas);
//         return () => {
//           updateCanvasContext(null);
//           canvas.dispose();
//         }
//     }, [height, width]);
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', height: '98vh' }}>
//         <Box sx={{ ...commonStyles, border: 1 }}>
//             <canvas width={width * 0.49} height={height * 0.98} ref={canvasEl}/>
//         </Box>
//     </Box>
//   );
// }