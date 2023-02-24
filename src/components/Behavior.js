import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAtomicRunning, selectBehaviourRunning, selectBehaviourScheduled, selectUninterruptibleRunning } from '../features/robotVariableSlice';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
  height: '100%',
};

export default function Behavior() {

  const atomicRunning = useSelector(selectAtomicRunning);
  const uninterruptibleRunning = useSelector(selectUninterruptibleRunning);
  const behaviorRunning = useSelector(selectBehaviourRunning);
  const behaviorScheduled = useSelector(selectBehaviourScheduled);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
      <Box sx={{ ...commonStyles, border: 1 }}>
        <Typography variant='subtitle1' align="center"> Behavior </Typography>
        <Typography variant='subtitle1' align="center"> Behavior Running: {behaviorRunning} </Typography>
        <Typography variant='subtitle1' align="center"> Behavior Scheduled: {behaviorScheduled} </Typography>
        <Typography variant='subtitle1' align="center"> Atomic Running: {atomicRunning ? "True" : "False"} </Typography>
        <Typography variant='subtitle1' align="center"> Uninterruptible Running: {uninterruptibleRunning ? "True" : "False"} </Typography>
      </Box>
    </Box>
  );
}
