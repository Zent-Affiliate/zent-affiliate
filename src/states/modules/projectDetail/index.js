import { createSlice } from "@reduxjs/toolkit";

const projectDetailSlice = createSlice({
    name: 'projectDetail',
    initialState:{
        project: {},
        isLoadingProjectDetail: false,
    },

    reducers:{
        getProjectDetail: (state) => ({
            ...state,
            isLoadingProjectDetail: true
        }),
        getProjectDetailSuccess: (state, action) => ({
            ...state,
            isLoadingProjectDetail: false,
            project: action.payload.data,
        }),
        getProjectDetailFail: (state) => ({
            ...state,
            isLoadingProjectDetail: false
        }),
    }
})

export const {
    getProjectDetail, getProjectDetailSuccess, getProjectDetailFail,
} = projectDetailSlice.actions

export default projectDetailSlice.reducer