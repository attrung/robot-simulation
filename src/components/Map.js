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
          <canvas id="mainMap" />
         </Box>
     </Box>
  );
}