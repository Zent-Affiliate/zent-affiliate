import {
  getProjectDetail,
  getProjectDetailFail,
  getProjectDetailSuccess,
} from '@/states/modules/projectDetail';
import callApi from '../callApi';

export const requestGetProjectDetail = () => async (dispatch, getState) => {
  const id = getState().app.location.params.project_id;
  return callApi({
    method: 'get',
    apiPath: `projects/${id}/detail`,
    actionTypes: [getProjectDetail, getProjectDetailSuccess, getProjectDetailFail],
    dispatch,
    getState,
  });
};
