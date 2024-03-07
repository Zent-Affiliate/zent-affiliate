import {createSlice} from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    isLoadingTableProject: false,
    visibleModalCreateProject: false,
    visibleModalUpdateProject: false,
    visibleModalDeleteProject: false,
    visiblePopoverSelect: false,
    isLoadingBtnCreateProject: false,
    isLoadingBtnUpdateProject: false,
    isLoadingBtnDeleteProject: false,
    projects: [],
    dataFilter: {
      keySearch: "",
      perPage: 20,
      page: 1,
      field: null,
      sortOrder: null,
      server: null,
      tags: [],
      status: null,
    },
    paginationListProjects: {
      currentPage: 1,
      perPage: 20,
      totalRecord: 0,
    },
    infoProject: {
      name: "",
      domain: "",
      server: "",
      tags: [],
      status: "",
    },
    errorInfoProject: {
      name: "",
      domain: "",
      server: "",
      tags: "",
    },
  },
  reducers: {
    setVisibleModalUpdateProject: (state, action) => ({
      ...state,
      visibleModalUpdateProject: action.payload,
    }),
    setVisibleModalDeleteProject: (state, action) => ({
      ...state,
      visibleModalDeleteProject: action.payload,
    }),
    setVisiblePopoverSelect: (state, action) => ({
      ...state,
      visiblePopoverSelect: action.payload,
    }),
    getListProject: (state) => ({
      ...state,
      projects: [],
      isLoadingTableProject: true,
      paginationListProjects: {
        currentPage: 1,
        perPage: 20,
        totalRecord: 0,
      },
    }),
    getListProjectSuccess: (state, action) => ({
      ...state,
      isLoadingTableProject: false,
      projects: action.payload.data.projects,
      paginationListProjects: {
        currentPage: action.payload.data.page,
        perPage: action.payload.data.perPage,
        totalRecord: action.payload.data.total,
      },
    }),
    getListProjectFailure: (state) => ({
      ...state,
      projects: [],
      isLoadingTableProject: false,
    }),
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: action.payload,
    }),
    setPaginationListProjects: (state, action) => ({
      ...state,
      paginationListProjects: action.payload,
    }),
    setInfoProject: (state, action) => ({
      ...state,
      infoProject: action.payload,
    }),
    setErrorInfoProject: (state, action) => ({
      ...state,
      errorInfoProject: action.payload,
    }),
    setVisibleModalCreateProject: (state, action) => ({
      ...state,
      visibleModalCreateProject: action.payload,
    }),
    createProject: (state) => ({
      ...state,
      isLoadingBtnCreateProject: true,
    }),
    createProjectSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateProject: false,
    }),
    createProjectFail: (state) => ({
      ...state,
      isLoadingBtnCreateProject: false,
    }),
    updateProject: (state) => ({
      ...state,
      isLoadingBtnUpdateProject: true,
    }),
    updateProjectSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateProject: false,
    }),
    updateProjectFail: (state) => ({
      ...state,
      isLoadingBtnUpdateProject: false,
    }),
    deleteProject: (state) => ({
      ...state,
      isLoadingBtnDeleteProject: true,
    }),
    deleteProjectSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteProject: false,
    }),
    deleteProjectFail: (state) => ({
      ...state,
      isLoadingBtnDeleteProject: false,
    }),
    setListDataProject: (state, action) => ({
      ...state,
      projects: action.payload
    })
  },
});

export const {
  setVisibleModalCreateProject,
  setVisibleModalUpdateProject,
  setVisibleModalDeleteProject,
  setVisiblePopoverSelect,
  setPaginationListProjects,
  getListProject,
  getListProjectSuccess,
  getListProjectFailure,
  setDataFilter,
  setInfoProject,
  setErrorInfoProject,
  createProject,
  createProjectSuccess,
  createProjectFail,
  updateProject,
  updateProjectSuccess,
  updateProjectFail,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail,
  setListDataProject
} = projectSlice.actions;
export default projectSlice.reducer;
