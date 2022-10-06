import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // routeId: null,
  // date: null,
  // startTime: null,
  // charge: null,
  // rotId: null,
  // seat: null,
  // durationTime: null,
  ticketInfo: {
    routeId: '',
    date: '',
    startTime: '',
    charge: '',
    rotId: '',
    seat: '',
    durationTime: '',
  },
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // setRouteId: (state, action) => {
    //   state.routeId = action.payload;
    // },
    // setDate: (state, action) => {
    //   state.date = action.payload;
    // },
    // setStartTime: (state, action) => {
    //   state.startTime = action.payload;
    // },
    // setCharge: (state, action) => {
    //   state.charge = action.payload;
    // },
    // setRotId: (state, action) => {
    //   state.rotId = action.payload;
    // },
    // setSeat: (state, action) => {
    //   state.seat = action.payload;
    // },
    // setDurationTime: (state, action) => {
    //   state.durationTime = action.payload;
    // },
    setTicketInfo: (state, action) => {
      return {
        ...state,
        routeId: action.payload.routeId,
        date: action.payload.date,
        startTime: action.payload.startTime,
        charge: action.payload.charge,
        rotId: action.payload.rotId,
        seat: action.payload.seat,
        durationTime: action.payload.durationTime,
      };
    },
  },
});

export const {
  // setRouteId,
  // setDate,
  // setStartTime,
  // setCharge,
  // setRotId,
  // setSeat,
  // setDurationTime,
  setTicketInfo,
} = ticketSlice.actions;

// Selectors
// export const selectOrigin = state => state.nav.origin;
export const selectTicketInfo = state => state.ticket.ticketInfo;

export default ticketSlice.reducer;
