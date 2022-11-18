import React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from 'react-redux';
import { Typography } from '@mui/material';
import { selectFridgeOpen } from '../features/sensorSlice';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Variables = () => {
  const fridgeOpen = useSelector(selectFridgeOpen);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1 }}>
            <Typography variant='subtitle1' align="center"> Variables </Typography>
            <Typography variant='button' align="left"> fridge is open: {fridgeOpen ? "true" : "false"} </Typography>
        </Box>
    </Box>
  );
}
