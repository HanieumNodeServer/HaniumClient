import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  object: {
    terSfr: '',
    terSto: '',
    date: '',
    time: '',
    arrTime: '',
  },
  // terSfr: '',
  // terSto: '',
  // date: '',
  // time: '',
  // arrTime: '',
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    // setTravelTimeInformation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
    // setTravelTimeInformation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
    // setTravelTimeInformation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
    // setTravelTimeInformation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
    // setTravelTimeInformation: (state, action) => {
    //   state.travelTimeInformation = action.payload;
    // },
    setObject: (state, action) => {
      // (state.object.terSfr = action.payload.terSfr),
      //   (state.object.terSto = action.payload.terSto),
      //   (state.object.date = action.payload.date),
      //   (state.object.time = action.payload.time),
      //   (state.object.arrTime = action.payload.arrTime);
      switch (action.type) {
        case 'UPDATE':
          const newObject = {
            terSfr: action.payload.terSfr,
            terSto: action.payload.terSto,
            date: action.payload.date,
            time: action.payload.time,
            arrTime: action.payload.arrTime,
          };
          state.object = newObject;
      }
      // state.push(newObject)
    },
  },
});

export const {setOrigin, setDestination, setTravelTimeInformation, setObject} =
  navSlice.actions;

// Selectors
export const selectOrigin = state => state.nav.origin;
export const selectDestination = state => state.nav.destination;
export const selectTravelTimeInformation = state =>
  state.nav.travelTimeInformation;
export const selectObject = state => state.nav.object;

export default navSlice.reducer;
