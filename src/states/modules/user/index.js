import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoadingTableUser: false,
        dataFilter: {
            keySearch: '',
            perPage: 20,
            page: 1,
            sort_order: null,
            column: null
        },
        paginationListUsers: {
            currentPage: 1,
            perPage: 20,
            totalRecord: 0
        },
        users: []
    },
    reducers: {
        getListUser: (state) => ({
            ...state,
            users: [],
            isLoadingTableUser: true,
            paginationListUsers: {
                currentPage: 1,
                perPage: 20,
                totalRecord: 0
            }
        }),
        getListUserSuccess: (state, action) => ({
            ...state,
            isLoadingTableUser: false,
            users: action.payload.data.users,
            paginationListUsers: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total
            }
        }),
        getListUserFailure: (state) => ({
            ...state,
            users: [],
            isLoadingTableUser: false
        }),
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),
        setPaginationListUsers: (state, action) => ({
            ...state,
            paginationListUsers: action.payload
        })
    }
});

export const {
    getListUser,
    getListUserSuccess,
    getListUserFailure,
    setDataFilter,
    setPaginationListUsers
} = userSlice.actions;

export default userSlice.reducer;
