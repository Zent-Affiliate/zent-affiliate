import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listUser: [],
  userActive: {},
  isLoadingGetListUserByRelationship: false,
  dataFilterUsers: {
    keySearch: '',
    perPage: 20,
    page: 1,
    sort_order: null,
    column: null,
  },
  paginationUsers: {
    currentPage: 1,
    perPage: 20,
    totalRecord: 0,
  },

  commissions: [],
  isLoadingCommission: false,
  activeCommission: {},

  histories: [],
  isLoadingListHistories: false,
  dataFilterHistories: {
    keySearch: '',
    perPage: 20,
    page: 1,
    sort_order: null,
    column: null,
  },
  paginationListHistories: {
    currentPage: 1,
    perPage: 20,
    totalRecord: 0,
  },
};

const commissionSlice = createSlice({
  name: 'commission',
  initialState,
  reducers: {
    setActiveCommission: (state, action) => ({
      ...state,
      activeCommission: action.payload,
    }),
    setActiveUser: (state, action) => ({
      ...state,
      userActive: action.payload,
    }),
    getListUserByRelationship: (state) => ({
      ...state,
      isLoadingGetListUserByRelationship: true,
    }),
    getListUserByRelationshipSuccess: (state, actions) => ({
      ...state,
      listUser: actions.payload.data.users,
      isLoadingGetListUserByRelationship: false,
    }),
    getListUserByRelationshipFail: (state) => ({
      ...state,
      isLoadingGetListUserByRelationship: false,
    }),
    setDataFilterUsers: (state, action) => ({
      ...state,
      dataFilterUsers: action.payload,
    }),
    setPaginationUsers: (state, action) => ({
      ...state,
      paginationUsers: action.payload,
    }),
    setListCommission: (state, actions) => ({
      ...state,
      commissions: actions.payload,
    }),
    getListCommission: (state) => ({
      ...state,
      isLoadingCommission: true,
    }),
    getListCommissionSuccess: (state, actions) => ({
      ...state,
      commissions: actions.payload.data.commissions,
      isLoadingCommission: false,
    }),
    getListCommissionFail: (state) => ({
      ...state,
      isLoadingCommission: false,
    }),
    setDataFilterHistories: (state, action) => ({
      ...state,
      dataFilterHistories: action.payload,
    }),
    setListHistories: (state, actions) => ({
      ...state,
      histories: actions.payload,
    }),
    getListHistories: (state) => ({
      ...state,
      isLoadingListHistories: true,
    }),
    getListHistoriesSuccess: (state, actions) => ({
      ...state,
      histories: actions.payload.data.histories,
      isLoadingListHistories: false,
      paginationListHistories: {
        currentPage: actions.payload.data.page,
        perPage: actions.payload.data.per_page,
        totalRecord: actions.payload.data.total,
      },
    }),
    getListHistoriesFail: (state) => ({
      ...state,
      isLoadingListHistories: false,
    }),

    refreshState: () => ({
      ...initialState,
    }),
  },
});

export const {
  setActiveCommission,
  getListUserByRelationship,
  getListUserByRelationshipSuccess,
  getListUserByRelationshipFail,
  setDataFilterUsers,
  setPaginationUsers,
  setActiveUser,
  getListCommission,
  getListCommissionSuccess,
  getListCommissionFail,
  setDataFilterHistories,
  getListHistories,
  getListHistoriesSuccess,
  getListHistoriesFail,
  setListCommission,
  setListHistories,

  refreshState,
} = commissionSlice.actions;
export default commissionSlice.reducer;
