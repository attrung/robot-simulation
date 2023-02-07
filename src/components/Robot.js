import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { selectMultiplier, selectTimeInString, setMultiplier } from '../features/timeSlice';
import {selectLightColour, selectSpeakText, selectGUI1, selectGUI2, selectGUI3} from '../features/robotUISlice';
import TextField from '@mui/material/TextField';
import { yellow, grey } from '@mui/material/colors';
import LightModeIcon from '@mui/icons-material/LightMode';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Robot = ({map, robot}) => {
  const timeInString = useSelector(selectTimeInString);
  const multiplier = useSelector(selectMultiplier);
  const dispatch = useDispatch();
  const lightColour = useSelector(selectLightColour);
  const speakText = useSelector(selectSpeakText);
  const GUI1 = useSelector(selectGUI1);
  const GUI2 = useSelector(selectGUI2);
  const GUI3 = useSelector(selectGUI3);

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

  const colourMap = {
    "yellow": yellow[600],
    "white": grey[300],
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
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant='subtitle1' align="left" spacing={1}> 
                      Light: {lightColour ? lightColour : "off"}    
                    </Typography>
                  </Grid>
                  <Grid item>
                    {lightColour ? <LightModeIcon sx={{color: colourMap[lightColour]}}/> : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle1' align="left" spacing={1}> 
                  Speak: {speakText ? speakText : "None"}
                </Typography>
              </Grid>
            </Grid>
        </Box>
    </Box>
  );
}