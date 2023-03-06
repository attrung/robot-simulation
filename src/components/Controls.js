import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { moveRobot } from '../utils/RobotMovement';
import { clearGUI, selectGUI1, selectGUI2, selectGUI3, selectGUI4 } from '../features/robotUISlice';
import { selectCurrentTime } from '../features/timeSlice';
import { selectIsMoving, selectMovableCoordinate, selectPersonCoordinate, selectRoomCoordinate, toggleShowMovementMap } from '../features/movementSlice';
import { SetContinue, SetGoToKitchen, SetGoToSofa, SetGoToTable, SetReturnHome, SetWaitHere, SetWatchTV } from '../utils/Behaviors';
import { clearBehaviorRunning, selectTrayIsEmpty, selectTrayIsRaised, setAtomicRunning, setTrayIsEmpty, setUninterruptibleRunning } from '../features/robotVariableSlice';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
  height: '100%',
};

export const Controls = ({ map, robot }) => {
  const movableCoordinates = useSelector(selectMovableCoordinate);
  const isMoving = useSelector(selectIsMoving);
  const destinationCoordinates = useSelector(selectRoomCoordinate);
  const personCoordinate = useSelector(selectPersonCoordinate);
  const GUI1 = useSelector(selectGUI1);
  const GUI2 = useSelector(selectGUI2);
  const GUI3 = useSelector(selectGUI3);
  const GUI4 = useSelector(selectGUI4);
  const trayIsEmpty = useSelector(selectTrayIsEmpty);
  const trayIsRaised = useSelector(selectTrayIsRaised);
  const currentTime = useSelector(selectCurrentTime);

  const dispatch = useDispatch();
  const moveRobotRandom = () => {
    if (!isMoving) {
      const randomIndex = Math.floor(Math.random() * movableCoordinates.length);
      const node = movableCoordinates[randomIndex];
      moveRobot(map, robot, node[0], node[1]);
    }
  }

  const moveRobotPerson = () => {
    if (!isMoving) {
      var moveIndex = 0;
      var minDist = Infinity;
      for (let i = 0; i < movableCoordinates.length; i++) {
        const distToPerson = Math.pow(movableCoordinates[i][0] - personCoordinate[0], 2) + Math.pow(movableCoordinates[i][1] - personCoordinate[1], 2)
        if (distToPerson < minDist) {
          minDist = distToPerson;
          moveIndex = i;
        }
      }
      const node = movableCoordinates[moveIndex];
      moveRobot(map, robot, node[0], node[1]);
    }
  }

  const moveRobotRoom = (room) => {
    if (!isMoving) {
      const node = destinationCoordinates[room];
      moveRobot(map, robot, node[0], node[1]);
    }
  }

  const GUItoBehaviorMap = {
    "GoToSofa": SetGoToSofa,
    "Continue": SetContinue,
    "GoToKitchen": SetGoToKitchen,
    "GoToTable": SetGoToTable,
    "ReturnHome": SetReturnHome,
    "WaitHere": SetWaitHere,
    "WatchTV": SetWatchTV,
  }

  const GUItoStringMap = {
    "GoToSofa": "Go To Sofa",
    "Continue": "Continue",
    "GoToKitchen": "Go To Kitchen",
    "GoToTable": "Go To Table",
    "ReturnHome": "Return Home",
    "WaitHere": "Wait Here",
    "WatchTV": "Watch TV",
  }

  const GUIPressed = (callback) => {
    callback();
    dispatch(clearGUI());
    dispatch(setUninterruptibleRunning({
      value: false,
    }))
    dispatch(setAtomicRunning({
      value: false,
    }))
    dispatch(clearBehaviorRunning());
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
      <Box sx={{ ...commonStyles, border: 1 }}>
        <Typography variant='subtitle1' align="center"> Controls </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="outlined" size='small' onClick={() => dispatch(toggleShowMovementMap())}> Toggle Movement Map </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant='subtitle1' align="left" spacing={1}> Tray: </Typography>
              </Grid>
              <Grid item xs={9}>
                {trayIsRaised && trayIsEmpty ? <Button variant="outlined" size='small' onClick={() => {
                  dispatch(setTrayIsEmpty({
                    value: false,
                    time: currentTime,
                  }))
                }}> Add Item To Tray </Button> : null}
                {(trayIsRaised && !trayIsEmpty) ? <Button variant="outlined" size='small' onClick={() => {
                  dispatch(setTrayIsEmpty({
                    value: true,
                    time: currentTime,
                  }))
                }}> Remove Item From Tray </Button> : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' align="left" spacing={1}> GUI Options: </Typography>
              </Grid>
              <Grid item xs={12}>
                {GUI1 ? <Button variant="outlined" size='small' onClick={() => GUIPressed(GUItoBehaviorMap[GUI1])}> {GUItoStringMap[GUI1]} </Button> : null}
              </Grid>
              <Grid item xs={12}>
                {GUI2 ? <Button variant="outlined" size='small' onClick={() => GUIPressed(GUItoBehaviorMap[GUI2])}> {GUItoStringMap[GUI2]} </Button> : null}
              </Grid>
              <Grid item xs={12}>
                {GUI3 ? <Button variant="outlined" size='small' onClick={() => GUIPressed(GUItoBehaviorMap[GUI3])}> {GUItoStringMap[GUI3]} </Button> : null}
              </Grid>
              <Grid item xs={12}>
                {GUI4 ? <Button variant="outlined" size='small' onClick={() => GUIPressed(GUItoBehaviorMap[GUI4])}> {GUItoStringMap[GUI4]} </Button> : null}
              </Grid>
              {/* <Grid item>
                <Button variant="outlined" size='small' onClick={moveRobotRandom}> Move Random </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" size='small' onClick={moveRobotPerson}> Move To Person </Button>
              </Grid> */}
              {/* {Object.keys(destinationCoordinates).map((room) => 
              <Grid item key={room}> 
                <Button variant="outlined" size='small' onClick={() => moveRobotRoom(room)}> Move {room} </Button>
              </Grid>
            )} */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
