import {
  createServer,
  createServerFail,
  createServerSuccess,
  deleteServer,
  deleteServerFail,
  deleteServerSuccess,
  getAllServer,
  getAllServerFailure,
  getAllServerSuccess,
  getListServer,
  getListServerFailure,
  getListServerSuccess,
  updateServer,
  updateServerFail,
  updateServerSuccess,
} from '@/states/modules/server';
import callApi from '@/api/callApi';
import _ from 'lodash';
import {SERVER_STATUS} from '@/utils/constains';

export const getAllServers = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'servers/all',
    actionTypes: [
      getAllServer,
      getAllServerSuccess,
      getAllServerFailure
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const getListServers = () => async (dispatch, getState) => {
  const dataFilterServer = getState().server.dataFilterServer;
  const params = new URLSearchParams();
  
  params.append('per_page', dataFilterServer.perPage);
  params.append('page', dataFilterServer.page);
  
  if (dataFilterServer.keySearch) {
    params.append('q', dataFilterServer.keySearch);
  }
  
  if (dataFilterServer.status === SERVER_STATUS.STOPPING || dataFilterServer.status === SERVER_STATUS.RUNNING) {
    params.append('status', dataFilterServer.status);
  }
  
  if (dataFilterServer.tags) {
    dataFilterServer.tags.forEach((tag) => {
      params.append('tags', tag);
    });
  }
  
  const path = `servers?${params.toString()}`;
  
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [
      getListServer,
      getListServerSuccess,
      getListServerFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleCreateServer = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `servers`,
    actionTypes: [
      createServer,
      createServerSuccess,
      createServerFail
    ],
    variables: {...data},
    dispatch,
    getState,
  })
}

export const handleUpdateServer = (id, data) => async (dispatch, getState) => {
  let dataServer = _.cloneDeep(data);
  delete dataServer?.id;
  
  return callApi({
    method: 'put',
    apiPath: `servers/${id}`,
    actionTypes: [
      updateServer,
      updateServerSuccess,
      updateServerFail
    ],
    variables: {...dataServer},
    dispatch,
    getState,
  })
}

export const handleDeleteServer = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `servers/${id}`,
    actionTypes: [
      deleteServer,
      deleteServerSuccess,
      deleteServerFail
    ],
    variables: {},
    dispatch,
    getState,
  })
}
