import { configureStore } from '@reduxjs/toolkit';
import sleepDataReducer from "./sleepData";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig={
    key: 'main-root',
    storage,
}

const reducer = combineReducers({
   sleepData: sleepDataReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
