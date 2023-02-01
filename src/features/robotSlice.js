import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentCoordinate: null,
    movableCoordinates: null,
    movableEdges: null,
    isMoving: false,
    showMovementMap: false,
    kitchenCoordinate: null,
    bedroomCoordinate: null,
    officeCoordinate: null,
    bathroomCoordinate: null,
    hallCoordinate: null,
    diningAreaCoordinate: null,
    tvCoordinate: null,
    sofaCoordinate: null,
    personCoordinate: null,
};

export const robotSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      setRobotCoordinate: (state, action) => {
        state.currentCoordinate = [action.payload.x, action.payload.y];
      },
      setPersonCoordinate: (state, action) => {
        state.personCoordinate = [action.payload.x, action.payload.y];
      },
      setMovableLocation: (state, action) => {
        state.movableCoordinates = action.payload.movableCoordinates;
        state.movableEdges = action.payload.movableEdges;
      },
      setIsMoving: (state, action) => {
        state.isMoving = action.payload.isMoving;
      },
      setKitchenCoordinate: (state, action) => {
        state.kitchenCoordinate = action.payload.coordinate;
      },
      setBedroomCoordinate: (state, action) => {
        state.bedroomCoordinate = action.payload.coordinate;
      },
      setOfficeCoordinate: (state, action) => {
        state.officeCoordinate = action.payload.coordinate;
      },
      setBathroomCoordinate: (state, action) => {
        state.bathroomCoordinate = action.payload.coordinate;
      },
      setHallCoordinate: (state, action) => {
        state.hallCoordinate = action.payload.coordinate;
      },
      setDiningAreaCoordinate: (state, action) => {
        state.diningAreaCoordinate = action.payload.coordinate;
      },
      setTvCoordinate: (state, action) => {
        state.tvCoordinate = action.payload.coordinate;
      },
      setSofaCoordinate: (state, action) => {
        state.sofaCoordinate = action.payload.coordinate;
      },
      toggleShowMovementMap: (state) => {
        state.showMovementMap = !state.showMovementMap;
      }
    },
  });

  export const selectMovableCoordinate = (state) => state.robot.movableCoordinates;
  export const selectIsMoving = (state) => state.robot.isMoving;
  export const selectShowMovementMap = (state) => state.robot.showMovementMap;
  export const selectRoomCoordinate = (state) => {return {
    "kitchen": state.robot.kitchenCoordinate,
    "bedroom": state.robot.bedroomCoordinate,
    "office": state.robot.officeCoordinate,
    "bathroom": state.robot.bathroomCoordinate,
    "hall": state.robot.hallCoordinate,
    "diningArea": state.robot.diningAreaCoordinate,
    "tv": state.robot.tvCoordinate,
    "sofa": state.robot.sofaCoordinate
  }};
  export const selectPersonCoordinate = (state) => state.robot.personCoordinate;

  export const {
    setRobotCoordinate, 
    setPersonCoordinate,
    setMovableLocation, 
    setIsMoving,
    setKitchenCoordinate,
    setBedroomCoordinate,
    setOfficeCoordinate,
    setBathroomCoordinate,
    setHallCoordinate,
    setDiningAreaCoordinate,
    setTvCoordinate,
    setSofaCoordinate,
    toggleShowMovementMap,
  } = robotSlice.actions;

  export default robotSlice.reducer;
