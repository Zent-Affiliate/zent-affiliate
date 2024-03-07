import callApi from '@/api/callApi'
import { 
  getConfig,
  getConfigSuccess,
  getConfigFailure,
  saveConfig, 
  saveConfigFail, 
  saveConfigSuccess,
  saveNotification,
  saveNotificationSuccess,
  saveNotificationFail,
} from '@/states/modules/config'
import { CONFIG_TYPE } from '@/utils/constains'
import _ from 'lodash'

export const getConfigs = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'configs',
    actionTypes: [
      getConfig,
      getConfigSuccess,
      getConfigFailure,
    ],
    variables: {},
    dispatch,
    getState,
  })
}

export const handleConfig = (data) => async (dispatch, getState) => {
  let actionTypes;
  if(data.type === CONFIG_TYPE.LARK_INFO){
    actionTypes = [saveConfig, saveConfigSuccess, saveConfigFail]
  }
  if (data.type === CONFIG_TYPE.NOTIFICATION) {
    actionTypes = [saveNotification, saveNotificationSuccess, saveNotificationFail]
  }
  return callApi({
    method: 'post',
    apiPath: `configs`,
    actionTypes,
    variables: { ...data },
    dispatch,
    getState,
  });
};

