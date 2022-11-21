import React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { selectBellRang, selectFridgeOpen, selectSofaSeated, selectTvOn } from '../features/sensorSlice';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Variables = () => {
  const fridgeOpen = useSelector(selectFridgeOpen);
  const sofaSeated = useSelector(selectSofaSeated);
  const bellRang = useSelector(selectBellRang);
  const tvOn = useSelector(selectTvOn);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' align="center"> Variables </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='button' align="left"> fridge is open: {fridgeOpen ? "true" : "false"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='button' align="left"> sofa is seated: {sofaSeated ? "true" : "false"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='button' align="left"> bell is ringing: {bellRang ? "true" : "false"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='button' align="left"> tv is on: {tvOn ? "true" : "false"} </Typography>
              </Grid>
            </Grid>
        </Box>
    </Box>
  );
}
