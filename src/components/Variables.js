import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import {
  selectBellRang,
  selectBellTime,
  selectFridgeOpen,
  selectFridgeTime,
  selectSofaSeated,
  selectSofaTime,
  selectTvOn,
  selectTvTime,
} from "../features/sensorSlice";
import { selectCurrentTime } from "../features/timeSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  selectMedicineDue5PM,
  selectMedicineDue5PMOnTime,
  selectMedicineReminder5PM,
  selectMedicineReminder5PMOnTime,
  selectTrayIsEmpty,
  selectTrayIsEmptyOnTime,
  selectTrayIsLowered,
  selectTrayIsLoweredOnTime,
  selectTrayIsRaised,
  selectTrayIsRaisedOnTime,
} from "../features/robotVariableSlice";
import {
  selectGOALanswerDoorBell,
  selectGOALanswerDoorBellOnTime,
  selectGOALfridgeUserAlerted,
  selectGOALfridgeUserAlertedOnTime,
  selectGOALgoToCharger,
  selectGOALgoToChargerOnTime,
  selectGOALgoToKitchen,
  selectGOALgoToKitchenOnTime,
  selectGOALgoToSofa,
  selectGOALgoToSofaOnTime,
  selectGOALgoToTable,
  selectGOALgoToTableOnTime,
  selectGOALwaitAtKitchen,
  selectGOALwaitAtKitchenOnTime,
  selectGOALwaitAtSofa,
  selectGOALwaitAtSofaOnTime,
  selectGOALwaitAtTable,
  selectGOALwaitAtTableOnTime,
  selectGOALwaitHere,
  selectGOALwaitHereOnTime,
  selectGOALwatchTV,
  selectGOALwatchTVOnTime,
} from "../features/goalVariableSlice";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  borderColor: "text.primary",
  width: "100%",
  height: "100%",
};

function createData(variable, value, timeElapsed) {
  return { variable, value, timeElapsed };
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
  const medicineReminder5PMOnTime = useSelector(
    selectMedicineReminder5PMOnTime
  );

  // Goal variables
  const GOALanswerDoorBell = useSelector(selectGOALanswerDoorBell);
  const GOALfridgeUserAlerted = useSelector(selectGOALfridgeUserAlerted);
  const GOALgoToCharger = useSelector(selectGOALgoToCharger);
  const GOALgoToTable = useSelector(selectGOALgoToTable);
  const GOALwaitAtTable = useSelector(selectGOALwaitAtTable);
  const GOALgoToSofa = useSelector(selectGOALgoToSofa);
  const GOALwaitAtSofa = useSelector(selectGOALwaitAtSofa);
  const GOALwatchTV = useSelector(selectGOALwatchTV);
  const GOALgoToKitchen = useSelector(selectGOALgoToKitchen);
  const GOALwaitAtKitchen = useSelector(selectGOALwaitAtKitchen);
  const GOALwaitHere = useSelector(selectGOALwaitHere);

  const GOALanswerDoorBellOnTime = useSelector(selectGOALanswerDoorBellOnTime);
  const GOALfridgeUserAlertedOnTime = useSelector(
    selectGOALfridgeUserAlertedOnTime
  );
  const GOALgoToChargerOnTime = useSelector(selectGOALgoToChargerOnTime);
  const GOALgoToTableOnTime = useSelector(selectGOALgoToTableOnTime);
  const GOALwaitAtTableOnTime = useSelector(selectGOALwaitAtTableOnTime);
  const GOALgoToSofaOnTime = useSelector(selectGOALgoToSofaOnTime);
  const GOALwaitAtSofaOnTime = useSelector(selectGOALwaitAtSofaOnTime);
  const GOALwatchTVOnTime = useSelector(selectGOALwatchTVOnTime);
  const GOALgoToKitchenOnTime = useSelector(selectGOALgoToKitchenOnTime);
  const GOALwaitAtKitchenOnTime = useSelector(selectGOALwaitAtKitchenOnTime);
  const GOALwaitHereOnTime = useSelector(selectGOALwaitHereOnTime);

  const rows = [
    createData("FridgeSensor", fridgeOpen, Math.floor(currentTime - fridgeOnTime)),
    createData("SofaSensor", sofaSeated, Math.floor(currentTime - sofaOnTime)),
    createData("BellSensor", bellRang, Math.floor(currentTime - bellOnTime)),
    createData("TvSensor", tvOn, Math.floor(currentTime - tvOnTime)),
    createData(
      "5PM-Medicine Due",
      medicineDue5PM,
      Math.floor(currentTime - medicineDue5PMOnTime)
    ),
    createData(
      "5PM-Medicine Reminder",
      medicineReminder5PM,
      Math.floor(currentTime - medicineReminder5PMOnTime)
    ),
    createData(
      "TrayIsRaised",
      trayIsRaised,
      Math.floor(currentTime - trayIsRaisedOnTime)
    ),
    createData(
      "TrayIsEmpty",
      trayIsEmpty,
      Math.floor(currentTime - trayIsEmptyOnTime)
    ),
    createData(
      "TrayIsLowered",
      trayIsLowered,
      Math.floor(currentTime - trayIsLoweredOnTime)
    ),
    createData(
      "GOAL-answerDoorBell",
      GOALanswerDoorBell,
      Math.floor(currentTime - GOALanswerDoorBellOnTime)
    ),
    createData(
      "GOAL-fridgeUserAlerted",
      GOALfridgeUserAlerted,
      Math.floor(currentTime - GOALfridgeUserAlertedOnTime)
    ),
    createData(
      "GOAL-goToCharger",
      GOALgoToCharger,
      Math.floor(currentTime - GOALgoToChargerOnTime)
    ),
    createData(
      "GOAL-goToTable",
      GOALgoToTable,
      Math.floor(currentTime - GOALgoToTableOnTime)
    ),
    createData(
      "GOAL-waitAtTable",
      GOALwaitAtTable,
      Math.floor(currentTime - GOALwaitAtTableOnTime)
    ),
    createData(
      "GOAL-goToSofa",
      GOALgoToSofa,
      Math.floor(currentTime - GOALgoToSofaOnTime)
    ),
    createData(
      "GOAL-waitAtSofa",
      GOALwaitAtSofa,
      Math.floor(currentTime - GOALwaitAtSofaOnTime)
    ),
    createData(
      "GOAL-goToKitchen",
      GOALgoToKitchen,
      Math.floor(currentTime - GOALgoToKitchenOnTime)
    ),
    createData(
      "GOAL-waitAtKitchen",
      GOALwaitAtKitchen,
      Math.floor(currentTime - GOALwaitAtKitchenOnTime)
    ),
    createData(
      "GOAL-watchTV",
      GOALwatchTV,
      Math.floor(currentTime - GOALwatchTVOnTime)
    ),
    createData(
      "GOAL-waitHere",
      GOALwaitHere,
      Math.floor(currentTime - GOALwaitHereOnTime)
    ),
  ];

  rows.sort((a, b) => {
    if (a.value === true && b.value === false) return -1;
    if (a.value === false && b.value === true) return 1;
    if (a.timeElapsed >= b.timeElapsed) return -1;
    if (a.timeElapsed < b.timeElapsed) return 1;
    return 0;
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "48vh" }}>
      <Box sx={{ ...commonStyles, border: 1, overflow: "scroll" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              {" "}
              Variables{" "}
            </Typography>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.variable}
                      </TableCell>
                      <TableCell align="right">
                        {row.value ? "True" : "False"}
                      </TableCell>
                      <TableCell align="right">
                        {row.value ? row.timeElapsed : ""}
                      </TableCell>
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
};
