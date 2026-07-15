import { createSlice } from "@reduxjs/toolkit";

export const sleepDataSlice = createSlice({
    name: "sleepData",
    initialState: {
        userData: []
    },
    reducers: {
        setSleepData: (state, action) => {
            state.userData = action.payload;
        },
        clearData: (state) => {
            state.userData = [];
        },
        addRows: (state, action) => {
            // action.payload = array of new rows
            state.userData.unshift(...action.payload);
        },
        removeRow: (state, action) => {
            // action.payload = index
            state.userData.splice(action.payload, 1);
        },
        updateRow: (state, action) => {
            const {index, row} = action.payload;
            state.userData[index] = row;
        },
        updateField: (state, action) => {
            const {index, field, value} = action.payload;
            state.userData[index][field] = value;
        }
    }
})

export const { setSleepData, clearData, addRows, removeRow, updateRow, updateField} = sleepDataSlice.actions;

export default sleepDataSlice.reducer;
