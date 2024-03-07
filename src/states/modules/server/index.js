import {createSlice} from '@reduxjs/toolkit';

const serverSlice = createSlice({
    name: 'server',
    initialState: {
        visibleModalCreateOrUpdateServer: false,
        visibleModalDeleteServer: false,
        visibleModalWarningServer: false,
        visiblePopoverSelect: false,
        isLoadingListServer: false,
        isLoadingBtnCreateServer: false,
        isLoadingBtnUpdateServer: false,
        isLoadingBtnDeleteServer: false,
        infoServer: {
            name: '',
            ip: '',
            tags: []
        },
        errorInfoServer: {
            name: '',
            ip: '',
            tags: ''
        },
        dataFilterServer: {
            keySearch: '',
            perPage: 9,
            page: 1,
            status: null,
            tags: []
        },
        paginationListServers: {
            currentPage: 1,
            perPage: 9,
            totalRecord: 0,
            page: 1
        },
        servers: [],
        configModal: {
            title: '',
            type: ''
        }
    },
    reducers: {
        setVisibleModalCreateOrUpdateServer: (state, action) => ({
            ...state,
            visibleModalCreateOrUpdateServer: action.payload
        }),
        setVisibleModalDeleteServer: (state, action) => ({
            ...state,
            visibleModalDeleteServer: action.payload
        }),
        setVisibleModalWarningServer: (state, action) => ({
            ...state,
            visibleModalWarningServer: action.payload
        }),
        setInfoServer: (state, action) => ({
            ...state,
            infoServer: action.payload
        }),
        setErrorInfoServer: (state, action) => ({
            ...state,
            errorInfoServer: action.payload
        }),
        getListServer: (state) => ({
            ...state,
            isLoadingListServer: true
        }),
        getListServerSuccess: (state, action) => {
            const data = action.payload.data.servers;

            const newData = data.filter(
                (item) => !state.servers.some((existingItem) => existingItem?._id === item?._id)
            );

            const updateServer = state.servers.map((existingItem) =>
                existingItem._id === state.infoServer.id
                    ? {
                        ...existingItem,
                        name: state.infoServer.name,
                        ip: state.infoServer.ip,
                        tags: state.infoServer.tags
                    }
                    : existingItem
            );

            return {
                ...state,
                servers: [...updateServer, ...newData],
                isLoadingListServer: false,
                paginationListServers: {
                    currentPage: action.payload.data.page,
                    perPage: action.payload.data.per_page,
                    totalRecord: action.payload.data.total,
                    page: action.payload.data.page
                }
            };
        },
        clearListServer: (state) => ({
            ...state,
            servers: [],
            infoServer: {},
            dataFilterServer: {
                ...state.dataFilterServer,
                page: 1
            }
        }),
        setListDataServer: (state, action) => ({
            ...state,
            servers: action.payload
        }),
        getListServerFailure: (state) => ({
            ...state,
            isLoadingListServer: false
        }),
        setDataFilterServer: (state, action) => ({
            ...state,
            dataFilterServer: action.payload
        }),
        getAllServer: (state) => ({
            ...state
        }),
        getAllServerSuccess: (state, action) => ({
            ...state,
            servers: action.payload.data
        }),
        getAllServerFailure: (state) => ({
            ...state
        }),
        createServer: (state) => ({
            ...state,
            isLoadingBtnCreateServer: true
        }),
        createServerSuccess: (state) => ({
            ...state,
            isLoadingBtnCreateServer: false
        }),
        createServerFail: (state) => ({
            ...state,
            isLoadingBtnCreateServer: false
        }),
        updateServer: (state) => ({
            ...state,
            isLoadingBtnUpdateServer: true
        }),
        updateServerSuccess: (state) => ({
            ...state,
            isLoadingBtnUpdateServer: false
        }),
        updateServerFail: (state) => ({
            ...state,
            isLoadingBtnUpdateServer: false
        }),
        deleteServer: (state) => ({
            ...state,
            isLoadingBtnDeleteServer: true
        }),
        deleteServerSuccess: (state) => ({
            ...state,
            isLoadingBtnDeleteServer: false
        }),
        deleteServerFail: (state) => ({
            ...state,
            isLoadingBtnDeleteServer: false
        }),
        setVisiblePopoverSelect: (state, action) => ({
            ...state,
            visiblePopoverSelect: action.payload
        }),
        setConfigModal: (state, action) => ({
            ...state,
            configModal: action.payload
        })
    }
});

export const {
    setVisibleModalCreateOrUpdateServer,
    setVisibleModalDeleteServer,
    setVisibleModalWarningServer,
    setInfoServer,
    setErrorInfoServer,
    getListServer,
    getListServerSuccess,
    getListServerFailure,
    setDataFilterServer,
    createServer,
    createServerSuccess,
    createServerFail,
    updateServer,
    updateServerSuccess,
    updateServerFail,
    deleteServer,
    deleteServerSuccess,
    deleteServerFail,
    clearListServer,
    setVisiblePopoverSelect,
    setConfigModal,
    setListDataServer,
    getAllServer,
    getAllServerSuccess,
    getAllServerFailure
} = serverSlice.actions;

export default serverSlice.reducer;
