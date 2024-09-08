import { createSlice } from "@reduxjs/toolkit";

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    origin: null,
    destinity: null,
    dateTime: null,
    departureTime: null,
    arriveTime: null,   
    capacity:null,
    price: null,
    idFlight:null,
  },
  reducers: {
    setFlightsData: (state, action) => {
      
      const { origin, destinity, dateTime, departureTime, arriveTime,capacity,price,idFlight } = action.payload;
      state.origin = origin;
      state.destinity = destinity;
      state.dateTime = dateTime;
      state.departureTime = departureTime;
      state.arriveTime = arriveTime;
      state.capacity=capacity;
      state.price = price;
      state.idFlight=idFlight;     
    },
  },
});

export const { setFlightsData } = flightsSlice.actions;

