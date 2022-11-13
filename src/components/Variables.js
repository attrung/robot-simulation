import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

export default function Variables() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1 }}>
            <Typography variant='subtitle1' align="center"> Variables </Typography>
        </Box>
    </Box>
  );
}
