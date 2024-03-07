import callApi from '@/api/callApi'
import {
  getListTag,
  getListTagFailure,
  getListTagSuccess
} from '@/states/modules/tag'

export const getListTags = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'tags/all',
    actionTypes: [
      getListTag,
      getListTagSuccess,
      getListTagFailure
    ],
    variables: {},
    dispatch,
    getState,
  })
}
