import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {moveAtoB} from "../utils/RobotMovement";
import Button from '@mui/material/Button';
import useWindowDimensions from '../utils/UseWindowDimension'

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export const Robot = ({canvas}) => {
  const { height, width } = useWindowDimensions();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1 }}>
            <Typography variant='subtitle1' align="center"> Robot </Typography>
            <Button variant="outlined" onClick={() => moveAtoB(canvas, 0, height, width)}> Move </Button>
        </Box>
    </Box>
  );
}
