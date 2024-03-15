import {
  getListCommission,
  getListCommissionFail,
  getListCommissionSuccess,
  getListHistories,
  getListHistoriesFail,
  getListHistoriesSuccess,
} from '@/states/modules/commission';
import callApi from '../callApi';

export const requestGetListCommission = () => async (dispatch, getState) => {
  const project_id = getState().app.location.params.project_id;
  const user_id = getState().app.location.params.id;

  const userActive = getState().commission.userActive;

  return callApi({
    method: 'get',
    apiPath: `commissions/${project_id}/${user_id}/${userActive._id}`,
    actionTypes: [getListCommission, getListCommissionSuccess, getListCommissionFail],
    variables: {},
    dispatch,
    getState,
  });
};

export const requestGetListHistory = () => async (dispatch, getState) => {
  const commissionActive = getState().commission.activeCommission;
  const dataFilter = getState().commission.dataFilterHistories;
  let path = `histories/${commissionActive._id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  if (dataFilter.sort_order) {
    path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getListHistories, getListHistoriesSuccess, getListHistoriesFail],
    variables: {},
    dispatch,
    getState,
  });
};
