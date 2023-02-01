import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import {Map} from './components/Map';
import Controls from './components/Controls';
import Behavior from './components/Behavior';
import {Robot} from './components/Robot';
import {Variables} from './components/Variables';
import './App.css';
import {getWindowDimensions} from './utils/UseWindowDimension';
import {initCanvas} from './utils/Canvas';
import { selectShowMovementMap } from './features/robotSlice';
import { store } from './app/store';
import { incrementTime } from './features/timeSlice';

setInterval(function() {
    store.dispatch(incrementTime());
}, 100)

function App() {
  const { height, width } = getWindowDimensions();
  const showMovementMap = useSelector(selectShowMovementMap);
  const [map, setMap] = useState('');
  const [robot, setRobot] = useState('');
  const [movementMap, setMovementMap] = useState('');
  const [person, setPerson] = useState('');
  useEffect(() => {
    const [initMap, initRobot, initMoveMap] = initCanvas(height, width);
    setMap(initMap);
    setRobot(initRobot);
    setMovementMap(initMoveMap);
  }, [width, height]);

  useEffect(() => {
    if (movementMap === ''){
        return
    }
    if (!showMovementMap){
        map.remove(movementMap);
    } else {
        map.add(movementMap);
        map.sendToBack(movementMap);
    }
  }, [map, movementMap, showMovementMap])

  return (
    <Grid container spacing={1} style={{height: '100%'}}>
        <Grid item xs={6} style={{height: '100%'}}>
            <Map/>
        </Grid>
        <Grid item xs={6}>
            <Grid container spacing={2}>
                <Grid item xs={6}> 
                    <Robot map={map} robot={robot}/>
                </Grid>
                <Grid item xs={6}> 
                    <Controls />
                </Grid>
                <Grid item xs={6}> 
                    <Variables />
                </Grid>
                <Grid item xs={6}> 
                    <Behavior />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default App;
