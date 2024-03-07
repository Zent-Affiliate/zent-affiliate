import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    visibleModalCreateUser: false,
    visibleModalUpdateUser: false,
    visibleModalDeleteUser: false,
    visibleModalChangePass: false,
    isLoadingTableUser: false,
    isLoadingBtnCreateUser: false,
    isLoadingBtnUpdateUser: false,
    isLoadingBtnDeleteUser: false,
    isLoadingBtnChangePassWordUser: false,
    infoUser: {
      name: "",
      email: "",
      phone: "",
      avatar: "",
      status: "",
      avatarUrl: "",
      password: "",
    },
    errorInfoUser: {
      name: "",
      email: "",
      phone: "",
      avatar: "",
      avatarUrl: "",
      password: "",
    },
    dataChangePassUser: {
      new_password: "",
      confirm_password: "",
    },
    errorDataChangePassUser: {
      new_password: "",
      confirm_password: "",
    },
    dataFilter: {
      keySearch: "",
      perPage: 20,
      page: 1,
      sort_order: null,
      column: null,
    },
    paginationListUsers: {
      currentPage: 1,
      perPage: 20,
      totalRecord: 0,
    },
    users: [],
  },
  reducers: {
    setVisibleModalCreateUser: (state, action) => ({
      ...state,
      visibleModalCreateUser: action.payload,
    }),
    setVisibleModalUpdateUser: (state, action) => ({
      ...state,
      visibleModalUpdateUser: action.payload,
    }),
    setVisibleModalDeleteUser: (state, action) => ({
      ...state,
      visibleModalDeleteUser: action.payload,
    }),
    setVisibleModalChangePass: (state, action) => ({
      ...state,
      visibleModalChangePass: action.payload,
    }),
    setInfoUser: (state, action) => ({
      ...state,
      infoUser: action.payload,
    }),
    setErrorInfoUser: (state, action) => ({
      ...state,
      errorInfoUser: action.payload,
    }),
    setDataChangePassUser: (state, action) => ({
      ...state,
      dataChangePassUser: action.payload,
    }),
    setErrorDataChangePassUser: (state, action) => ({
      ...state,
      errorDataChangePassUser: action.payload,
    }),
    getListUser: (state) => ({
      ...state,
      users: [],
      isLoadingTableUser: true,
      paginationListUsers: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0,
      },
    }),
    getListUserSuccess: (state, action) => ({
      ...state,
      isLoadingTableUser: false,
      users: action.payload.data.users,
      paginationListUsers: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.per_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListUserFailure: (state) => ({
      ...state,
      users: [],
      isLoadingTableUser: false,
    }),
    getDetailUser: (state) => ({
      ...state,
      infoUser: {},
    }),
    getDetailUserSuccess: (state, action) => ({
      ...state,
      infoUser: action.payload,
    }),
    getDetailUserFailure: (state) => ({
      ...state,
      infoUser: {},
    }),
    changeStatusUser: (state) => ({
      ...state,
      status: "",
    }),
    changeStatusUserSuccess: (state, action) => ({
      ...state,
      status: action.payload,
    }),
    changeStatusUserFail: (state) => ({
      ...state,
      status: "",
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListUsers: (state, action) => ({
      ...state,
      paginationListUsers: action.payload,
    }),
    createUser: (state) => ({
      ...state,
      isLoadingBtnCreateUser: true,
    }),
    createUserSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateUser: false,
    }),
    createUserFail: (state) => ({
      ...state,
      isLoadingBtnCreateUser: false,
    }),
    updateUser: (state) => ({
      ...state,
      isLoadingBtnUpdateUser: true,
    }),
    updateUserSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateUser: false,
    }),
    updateUserFail: (state) => ({
      ...state,
      isLoadingBtnUpdateUser: false,
    }),
    deleteUser: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: true,
    }),
    deleteUserSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: false,
    }),
    deleteUserFail: (state) => ({
      ...state,
      isLoadingBtnDeleteUser: false,
    }),
    changePassWordUser: (state) => ({
      ...state,
      isLoadingBtnChangePassWordUser: true,
    }),
    changePassWordUserSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassWordUser: false,
    }),
    changePassWordUserFail: (state) => ({
      ...state,
      isLoadingBtnChangePassWordUser: false,
    }),
  },
});

export const {
  setVisibleModalCreateUser,
  setVisibleModalUpdateUser,
  setVisibleModalDeleteUser,
  setVisibleModalChangePass,
  setInfoUser,
  setErrorInfoUser,
  setDataChangePassUser,
  setErrorDataChangePassUser,
  getListUser,
  getListUserSuccess,
  getListUserFailure,
  changeStatusUser,
  changeStatusUserSuccess,
  changeStatusUserFail,
  getDetailUser,
  getDetailUserSuccess,
  getDetailUserFailure,
  setDataFilter,
  setPaginationListUsers,
  createUser,
  createUserSuccess,
  createUserFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
  changePassWordUser,
  changePassWordUserSuccess,
  changePassWordUserFail,
} = userSlice.actions;
export default userSlice.reducer;
