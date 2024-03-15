import { createSlice } from "@reduxjs/toolkit";

const projectAdminSlice = createSlice({
    name: 'projectAdmin',
    initialState: {
        projectAdmins: [],
        admin : {},
        projectAdmin: {
            id: '',
            code: '',
            name: '',
            admin_id: '',
            secret_key: ''
        },
        dataFilter: {
            keySearch: '',
            perPage: 20,
            page: 1,
            field: null,
            sortOrder: null,
        },
        paginationListProjectAdmin: {
            currentPage: 1,
            perPage: 20,
            totalRecord: 0
        },
        infoProject: {
            id: '',
            code: '',
            name: '',
            admin_id: '',
            secret_key: ''
        },
        errorInfoProject: {
            id: '',
            code: '',
            name: '',
            admin_id: '',
            secret_key: ''
        },
        isLoadingTableProjectAdmin: false,
        visibleModalCreateProjectAdmin: false,
        visibleModalUpdateProjectAdmin: false,
        visibleModalDeleteProjectAdmin: false,
        visiblePopoverSelectAdmin: false,
        isLoadingBtnCreateProjectAdmin: false,
        isLoadingBtnUpdateProjectAdmin: false,
        isLoadingBtnDeleteProjectAdmin: false,
        projectAdminActive: null,
    },

    reducers: {
        setVisibleModalUpdateProjectAdmin: (state, action) => ({
            ...state,
            visibleModalUpdateProjectAdmin: action.payload
        }),
        setVisibleModalDeleteProjectAdmin: (state, action) => ({
            ...state,
            visibleModalDeleteProjectAdmin: action.payload
        }),
        setVisiblePopoverSelectAdmin: (state, action) => ({
            ...state,
            visiblePopoverSelectAdmin: action.payload
        }),
        getListProjectAdmin: (state) => ({
            ...state,
            projectAdmins: [],
            admin: {},
            paginationListProjectAdmin: {
                currentPage: 1,
                perPage: 20,
                totalRecord: 0
            },
            isLoadingTableProjectAdmin: true
        }),
        getListProjectAdminSuccess: (state, action) => ({
            ...state,
            isLoadingTableProjectAdmin: false,
            projectAdmins: action.payload.data.projects,
            paginationListProjectAdmin: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalRecord: action.payload.data.total
            },
            admin: action.payload.data.admin
        }),
        getListProjectAdminFail: (state) => ({
            ...state,
            projectAdmins: [],
            className: '',
            isLoadingTableProjectAdmin: false,
        }),
        setProjectAdminActive: (state, action) => ({
            ...state,
            projectAdminActive: action.payload
        }),
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),
        setPaginationListProjectAdmin: (state, action) => ({
            ...state,
            paginationListProjectAdmin: action.payload
        }),
        startGetListAdmins: (state) => ({
            ...state,
            admins: []
        }),
        getListAdminsSuccess: (state, action) => ({
            ...state,
            admins: action.payload.data
        }),
        getListAdminsFail: (state) => ({
            ...state,
            admins: []
        }),
        setInfoProjectAdmin: (state, action) => ({
            ...state,
            infoProject: action.payload
        }),
        setErrorInfoProjectAdmin: (state, action) => ({
            ...state,
            errorInfoProject: action.payload
        }),
        setVisibleModalCreateProjectAdmin: (state, action) => ({
            ...state,
            visibleModalCreateProjectAdmin: action.payload
        }),
        startCreateProjectAdmin: (state) => ({
            ...state,
            isLoadingBtnCreateProjectAdmin: true
        }),
        createProjectAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateProjectAdmin: false,
            visibleModalCreateProjectAdmin: false
        }),
        createProjectAdminFail: (state) => ({
            ...state,
            isLoadingBtnCreateProjectAdmin: false
        }),

        startUpdateProjectAdmin: (state) => ({
            ...state,
            isLoadingBtnUpdateProjectAdmin: true
        }),
        updateProjectAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateProjectAdmin: false,
            visibleModalUpdateProjectAdmin: false
        }),
        updateProjectAdminFail: (state) => ({
            ...state,
            isLoadingBtnUpdateProjectAdmin: false
        }),

        startDeleteProjectAdmin: (state) => ({
            ...state,
            isLoadingBtnDeleteProjectAdmin: true
        }),
        deleteProjectAdminSuccess: (state) => ({
            ...state,
            isLoadingBtnDeleteProjectAdmin: false,
            visibleModalDeleteProjectAdmin: false
        }),
        deleteProjectAdminFail: (state) => ({
            ...state,
            isLoadingBtnDeleteProjectAdmin: false
        }),

        setDataProjectAdmin: (state, action) => ({
            ...state,
            projectAdmin: action.payload
        }),
    }
})

export const {
    setDataFilter,
    setDataProjectAdmin,
    setVisibleModal,
    setProjectAdminActive,
    setInfoProjectAdmin,
    setErrorInfoProjectAdmin,
    setVisibleModalCreateProjectAdmin,
    setVisibleModalUpdateProjectAdmin,
    setVisiblePopoverSelectAdmin,
    setVisibleModalDeleteProjectAdmin,
    getListProjectAdmin, getListProjectAdminSuccess, getListProjectAdminFail,
    startGetListAdmins, getListProjectAdminsSuccess, getListAdminsFail,
    startCreateProjectAdmin, createProjectAdminSuccess, createProjectAdminFail,
    startUpdateProjectAdmin, updateProjectAdminSuccess, updateProjectAdminFail,
    startDeleteProjectAdmin, deleteProjectAdminSuccess, deleteProjectAdminFail,
  } = projectAdminSlice.actions
  
  export default projectAdminSlice.reducer;