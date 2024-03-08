import {createSlice} from '@reduxjs/toolkit';

const commissionSlice = createSlice({
    name: 'commission',
    initialState: {
        paginationListHistories: {
            currentPage: 1,
            perPage: 10,
            totalRecord: 0
        }
    },
    reducers: {}

});

export const {
    getConfig
} = commissionSlice.actions;
export default commissionSlice.reducer;
