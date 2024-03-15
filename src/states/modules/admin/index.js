import { createSlice } from "@reduxjs/toolkit" 
const initialState= {
    visibleModalCreateAdmin: false,
    visibleModalUpdateAdmin: false,
    visibleModalDeleteAdmin: false,
    visibleModalChangePass: false,
    isLoadingTableAdmin: false,
    isLoadingBtnCreateAdmin: false,
    isLoadingBtnUpdateAdmin: false,
    isLoadingBtnDeleteAdmin: false,
    isLoadingBtnChangePassWordAdmin: false,
    infoAdmin: {
        name: '',
        email: '',
        password: ''
    },
    errorInfoAdmin: {
        name: '',
        email: '',
        password: ''
    },
    dataChangePassAdmin: {
        new_password: '',
        confirm_password: ''
    },
    errorDataChangePassAdmin: {
        new_password: '',
        confirm_password: ''
    },
    dataFilter: {
        keySearch: '',
        perPage: 20,
        page: 1,
        sort_order: null,
        column: null
    },
    paginationListAdmins: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0
    },
    admins: []
};
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        setVisibleModalCreateAdmin: (state, action) => ({
            ...state,
            visibleModalCreateAdmin: action.payload
        }),
        setVisibleModalUpdateAdmin: (state, action) => ({
            ...state,
            visibleModalUpdateAdmin: action.payload
        }),
        setVisibleModalDeleteAdmin: (state, action) => ({
            ...state,
            visibleModalDeleteAdmin: action.payload
        }),
        setVisibleModalChangePass: (state, action) => ({
            ...state,
            visibleModalChangePass: action.payload
        }),
        setInfoAdmin: (state, action) => ({
            ...state,
            infoAdmin: action.payload
        }),
        setErrorInfoAdmin: (state, action) => ({
            ...state,
            errorInfoAdmin: action.payload
        }),
        setDataChangePassAdmin: (state, action) => ({
            ...state,
            dataChangePassAdmin: action.payload
        }),
        setErrorDataChangePassAdmin: (state, action) => ({
            ...state,
            errorDataChangePassAdmin: action.payload
        }),
        getListAdmin: (state) => ({
            ...state,
            admins: [],
            isLoadingTableAdmin: true,
            paginationListAdmins: {
                currentPage: 1,
                perPage: 20,
                totalRecord: 0
            }
        }),
        getListAdminSuccess: (state, action) => ({
            ...state,
            isLoadingTableAdmin: false,
            admins: action.payload.data.admins,
            paginationListAdmins: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total
            }
        }),
        
        getListAdminFailure: (state) => ({
            ...state,
            admins: [],
            isLoadingTableAdmin: false
        }),
        getDetailAdmin: (state) => ({
            ...state,
            infoAdmin: {}
        }),
        getDetailAdminSuccess: (state, action) => ({
            ...state,
            infoAdmin: action.payload
        }),
        getDetailAdminFailure: (state) => ({
            ...state,
            infoAdmin: {}
        }),
        changeStatusAdmin: (state) => ({
            ...state,
            status: ''
        }),
        changeStatusAdminSuccess: (state, action) => ({
            ...state,
            status: action.payload
        }),
        changeStatusAdminFail: (state) => ({
            ...state,
            status: ''
        }),
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),
        setPaginationListAdmins: (state, action) => ({
            ...state,
            paginationListAdmins: action.payload
        }),
        createAdmin: (state) => ({
            ...state,
            isLoadingBtnCreateAdmin: true
        }),
        createAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateAdmin: false
        }),
        createAdminFail: (state) => ({
            ...state,
            isLoadingBtnCreateAdmin: false
        }),
        updateAdmin: (state) => ({
            ...state,
            isLoadingBtnUpdateAdmin: true
        }),
        updateAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateAdmin: false
        }),
        updateAdminFail: (state) => ({
            ...state,
            isLoadingBtnUpdateAdmin: false
        }),
        deleteAdmin: (state) => ({
            ...state,
            isLoadingBtnDeleteAdmin: true
        }),
        deleteAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnDeleteAdmin: false
        }),
        deleteAdminFail: (state) => ({
            ...state,
            isLoadingBtnDeleteAdmin: false
        }),
        changePassWordAdmin: (state) => ({
            ...state,
            isLoadingBtnChangePassWordAdmin: true
        }),
        changePassWordAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnChangePassWordAdmin: false
        }),
        changePassWordAdminFail: (state) => ({
            ...state,
            isLoadingBtnChangePassWordAdmin: false
        }),
        refreshRouteAdmin: () => ({
            ...initialState
        })


        
    }
})

export const {
    setVisibleModalCreateAdmin,
    setVisibleModalUpdateAdmin,
    setVisibleModalDeleteAdmin,
    setVisibleModalChangePass,
    setInfoAdmin,
    setErrorInfoAdmin,
    setDataChangePassAdmin,
    setErrorDataChangePassAdmin,
    getListAdmin,
    getListAdminSuccess,
    getListAdminFailure,
    changeStatusAdmin,
    changeStatusAdminSuccess,
    changeStatusAdminFail,
    getDetailAdmin,
    getDetailAdminSuccess,
    getDetailAdminFailure,
    setDataFilter,
    setPaginationListAdmins,
    createAdmin,
    createAdminSuccess,
    createAdminFail,
    updateAdmin,
    updateAdminSuccess,
    updateAdminFail,
    deleteAdmin,
    deleteAdminSuccess,
    deleteAdminFail,
    changePassWordAdmin,
    changePassWordAdminSuccess,
    changePassWordAdminFail,
    refreshRouteAdmin
} = adminSlice.actions;
export default adminSlice.reducer;