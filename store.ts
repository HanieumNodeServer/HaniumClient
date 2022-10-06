import {configureStore} from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import ticketReducer from './slices/ticketSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    ticket: ticketReducer,
  },
});
