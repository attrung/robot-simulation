import React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { selectBellRang, selectBellTime, selectFridgeOpen, selectFridgeTime, selectSofaSeated, selectSofaTime, selectTvOn, selectTvTime } from '../features/sensorSlice';
import { selectCurrentTime } from '../features/timeSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '100%',
    height: '100%',
  };

function createData(
  variable,
  value,
  timeElapsed,
) {
  return { variable, value, timeElapsed};
}

export const Variables = () => {
  const currentTime = useSelector(selectCurrentTime);
  const fridgeOpen = useSelector(selectFridgeOpen);
  const fridgeOnTime = useSelector(selectFridgeTime);
  const sofaSeated = useSelector(selectSofaSeated);
  const sofaOnTime = useSelector(selectSofaTime);
  const bellRang = useSelector(selectBellRang);
  const bellOnTime = useSelector(selectBellTime);
  const tvOn = useSelector(selectTvOn);
  const tvOnTime = useSelector(selectTvTime);
  const rows = [
    createData('Fridge', fridgeOpen, Math.floor(currentTime - fridgeOnTime)),
    createData('Sofa', sofaSeated, Math.floor(currentTime - sofaOnTime)),
    createData('Bell', bellRang, Math.floor(currentTime - bellOnTime)),
    createData('Tv', tvOn, Math.floor(currentTime - tvOnTime)),
  ];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' align="center"> Variables </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Variables </TableCell>
                        <TableCell align="right"> Value </TableCell>
                        <TableCell align="right"> Time (s) </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.variable}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.variable}
                          </TableCell>
                          <TableCell align="right">{row.value? "True" : "False"}</TableCell>
                          <TableCell align="right">{row.value ? row.timeElapsed : ""}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
        </Box>
    </Box>
  );
}
