import callApi from '@/api/callApi'
import _ from 'lodash'
import {
  createProject,
  createProjectFail,
  createProjectSuccess,
  deleteProject,
  deleteProjectFail,
  deleteProjectSuccess,
  getListProject,
  getListProjectFailure,
  getListProjectSuccess,
  updateProject,
  updateProjectFail,
  updateProjectSuccess,
} from '@/states/modules/project'
import { PROJECT_STATUS } from '@/utils/constains'

export const handleCreateProject = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `projects`,
    actionTypes: [
      createProject,
      createProjectSuccess,
      createProjectFail
    ],
    variables: {...data},
    dispatch,
    getState,
  })
}

export const handleUpdateProject = (id, data) => async (dispatch, getState) => {
  let dataProject = _.cloneDeep(data)
  delete dataProject?._id
  return callApi({
    method: 'put',
    apiPath: `projects/${id}`,
    actionTypes: [
      updateProject,
      updateProjectSuccess,
      updateProjectFail
    ],
    variables: {...data},
    dispatch,
    getState,
  })
}

export const getListProjects = () => async (dispatch, getState) => {
  const dataFilter = getState().project.dataFilter
  const params = new URLSearchParams();

  params.append('perPage', dataFilter.perPage);
  params.append('page', dataFilter.page);
  
  if (dataFilter.keySearch) {
    params.append('q', dataFilter.keySearch);
  }
  
  if (dataFilter.sortOrder && dataFilter.field) {
    params.append('sortOrder', dataFilter.sortOrder);
    params.append('field', dataFilter.field);
  }
  
  if (dataFilter.server) {
    params.append('server', dataFilter.server);
  }
  
  if (dataFilter.tags) {
    dataFilter.tags.forEach((tag) => {
      params.append('tags', tag);
    });
  }

  if (dataFilter.status === PROJECT_STATUS.STOPPING || dataFilter.status === PROJECT_STATUS.RUNNING) {
    params.append('status', dataFilter.status);
  }

  const path = `projects?${params.toString()}`;

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListProject,
      getListProjectSuccess,
      getListProjectFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleDeleteProject = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `projects/${id}`,
    actionTypes: [
      deleteProject,
      deleteProjectSuccess,
      deleteProjectFail
    ],
    variables: {},
    dispatch,
    getState,
  })
}
