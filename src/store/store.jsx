import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../slice/authSlice';
import { flightsSlice } from '../slice/flightsSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
    key: 'root',
    version:1,
    storage,
};

const reducer = combineReducers({
    auth: authSlice.reducer, 
    flights: flightsSlice.reducer, 
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),  
});

