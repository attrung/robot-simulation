import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { moveRobot } from '../utils/RobotMovement';
import {selectIsMoving, selectMovableCoordinate, selectRoomCoordinate, toggleShowMovementMap} from '../features/robotSlice';
import { selectMultiplier, selectTimeInString, setMultiplier } from '../features/timeSlice';
import TextField from '@mui/material/TextField';


const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Robot = ({map, robot}) => {
  const movableCoordinates = useSelector(selectMovableCoordinate);
  const isMoving = useSelector(selectIsMoving);
  const destinationCoordinates = useSelector(selectRoomCoordinate);
  const timeInString = useSelector(selectTimeInString);
  const multiplier = useSelector(selectMultiplier);
  const dispatch = useDispatch();
  const moveRobotRandom = () => {
    if (!isMoving){
      const randomIndex = Math.floor(Math.random() * movableCoordinates.length);
      const node = movableCoordinates[randomIndex];
      moveRobot(map, robot, node[0], node[1]);
    }
  }

  const moveRobotRoom = (room) => {
    if (!isMoving){
      const node = destinationCoordinates[room];
      moveRobot(map, robot, node[0], node[1]);
    }
  }

  const setNewMultiplier = (value) => {
    if (value === ""){
      value = "0";
    }
    if (!isNaN(value) && value >= 0){
      value = parseFloat(value)
      if (Number.isInteger(value)){
        dispatch(setMultiplier({multiplier: value}))
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1}}>
            <Typography variant='subtitle1' align="center"> Robot </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' align="left" spacing={1}> Current Time: {timeInString} </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-number" label="Mutiplier" variant="outlined" InputLabelProps={{
                  shrink: true,
                }} value={multiplier} onChange={(e) => setNewMultiplier(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" size='small' onClick={() => dispatch(toggleShowMovementMap())}> Toggle Movement Map </Button>
              </Grid>
              <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="outlined" size='small' onClick={moveRobotRandom}> Move Random </Button>
                </Grid>
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