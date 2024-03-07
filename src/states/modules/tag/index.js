import {createSlice} from '@reduxjs/toolkit';

const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        isLoadingListTag: false,
        tags: []
    },
    reducers: {
        getListTag: (state) => ({
            ...state,
            isLoadingListTag: true
        }),
        getListTagSuccess: (state, action) => ({
            ...state,
            isLoadingListTag: false,
            tags: action.payload.data.tags
        }),
        getListTagFailure: (state) => ({
            ...state,
            isLoadingListTag: false
        })
    }
});

export const {
    getListTag,
    getListTagSuccess,
    getListTagFailure
} = tagSlice.actions;
export default tagSlice.reducer;
