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
import { selectMedicineDue5PM, selectMedicineDue5PMOnTime, selectMedicineReminder5PM, selectMedicineReminder5PMOnTime, selectTrayIsEmpty, selectTrayIsEmptyOnTime, selectTrayIsLowered, selectTrayIsLoweredOnTime, selectTrayIsRaised, selectTrayIsRaisedOnTime } from '../features/robotVariableSlice';

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
  // Sensors variables
  const fridgeOpen = useSelector(selectFridgeOpen);
  const fridgeOnTime = useSelector(selectFridgeTime);
  const sofaSeated = useSelector(selectSofaSeated);
  const sofaOnTime = useSelector(selectSofaTime);
  const bellRang = useSelector(selectBellRang);
  const bellOnTime = useSelector(selectBellTime);
  const tvOn = useSelector(selectTvOn);
  const tvOnTime = useSelector(selectTvTime);

  // Robot variables
  const trayIsRaised = useSelector(selectTrayIsRaised);
  const trayIsEmpty = useSelector(selectTrayIsEmpty);
  const trayIsLowered = useSelector(selectTrayIsLowered);
  const medicineDue5PM = useSelector(selectMedicineDue5PM);
  const medicineReminder5PM = useSelector(selectMedicineReminder5PM);

  const trayIsRaisedOnTime = useSelector(selectTrayIsRaisedOnTime);
  const trayIsEmptyOnTime = useSelector(selectTrayIsEmptyOnTime);
  const trayIsLoweredOnTime = useSelector(selectTrayIsLoweredOnTime);
  const medicineDue5PMOnTime = useSelector(selectMedicineDue5PMOnTime);
  const medicineReminder5PMOnTime = useSelector(selectMedicineReminder5PMOnTime);

  const rows = [
    createData('Fridge', fridgeOpen, Math.floor(currentTime - fridgeOnTime)),
    createData('Sofa', sofaSeated, Math.floor(currentTime - sofaOnTime)),
    createData('Bell', bellRang, Math.floor(currentTime - bellOnTime)),
    createData('Tv', tvOn, Math.floor(currentTime - tvOnTime)),
    createData('5PM-Medicine Due', medicineDue5PM, Math.floor(currentTime - medicineDue5PMOnTime)),
    createData('5PM-Medicine Reminder', medicineReminder5PM, Math.floor(currentTime - medicineReminder5PMOnTime)),
    createData('TrayIsRaised', trayIsRaised, Math.floor(currentTime - trayIsRaisedOnTime)),
    createData('TrayIsEmpty', trayIsEmpty, Math.floor(currentTime - trayIsEmptyOnTime)),
    createData('TrayIsLowered', trayIsLowered, Math.floor(currentTime - trayIsLoweredOnTime)),
  ];

  rows.sort((a, b) => {
    if (a.value === true  && b.value === false) return -1;
    if (a.value === false  && b.value === true) return 1;
    if (a.timeElapsed >= b.timeElapsed) return -1;
    if (a.timeElapsed < b.timeElapsed) return 1;
    return 0;
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '48vh' }}>
        <Box sx={{ ...commonStyles, border: 1, overflow: "scroll"}}>
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
