import {decryptData} from '@/utils/crypto';
import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

export const errorConfig = {
  app_id: '',
  app_secret: '',
  group_id: '',
  oauth_url: '',
  message_url: '',
};

export const errorNotification = {
  notification_time: '',
  notification_time_type: '',
  notification_server: '',
  notification_project: '',
  notification_service: '',
  notification_cpu: '',
  notification_ram: '',
  notification_disk: '',
  warning_cpu: '',
  warning_ram: '',
  warning_disk: '',
};

export const infoLarkInit = {
  type: 0,
  app_id: "",
  app_secret: "",
  group_id: "",
  oauth_url: "",
  message_url: ""
}

export const notificationInit = {
  type: 1,
  notification_time: 1,
  notification_time_type: 2,
  notification_server: 0,
  notification_project: 0,
  notification_service: 0,
  notification_cpu: 0,
  notification_ram: 0,
  notification_disk: 0,
  warning_cpu: 0,
  warning_ram: 0,
  warning_disk: 0
}

const configSlice = createSlice({
  name: 'config',
  initialState: {
    isLoadingConfig: false,
    isLoadingSaveConfig: false,
    isLoadingSaveNotification: false,
    isStatusSwitchCpu: false,
    isStatusSwitchRam: false,
    isStatusSwitchDisk: false,
    config: {
      infoLark: {
        app_id: '',
        app_secret: '',
        group_id: '',
        oauth_url: '',
        message_url: '',
      },
      notification: {
        notification_time: 0,
        notification_time_type: 0,
        notification_server: 0,
        notification_project: 0,
        notification_service: 0,
        notification_cpu: 0,
        notification_ram: 0,
        notification_disk: 0,
        warning_cpu: 0,
        warning_ram: 0,
        warning_disk: 0,
      },
    },
    errorConfig: _.cloneDeep(errorConfig),
    errorNotification: _.cloneDeep(errorNotification)
  },
  reducers: {
    getConfig: (state) => ({
      ...state,
      config: {},
      isLoadingConfig: true,
    }),
    getConfigSuccess: (state, action) => {
      const decryptedAppSecret = 
        action.payload.data?.infoLark?.app_secret ? 
        decryptData(action.payload.data?.infoLark?.app_secret) : "";
      return {
        ...state,
        isLoadingConfig: false,
        config: {
          ...action.payload.data,
          infoLark: {
            ...action.payload.data.infoLark,
            app_secret: decryptedAppSecret,
          },
        },
      };
    },
    getConfigFailure: (state) => ({
      ...state,
      config: {},
      isLoadingConfig: false,
    }),
    saveConfig: (state) => ({
      ...state,
      isLoadingSaveConfig: true,
    }),
    saveConfigSuccess: (state) => ({
      ...state,
      isLoadingSaveConfig: false,
    }),
    saveConfigFail: (state) => ({
      ...state,
      isLoadingSaveConfig: false,
    }),
    saveNotification: (state) => ({
      ...state,
      isLoadingSaveNotification: true,
    }),
    saveNotificationSuccess: (state) => ({
      ...state,
      isLoadingSaveNotification: false,
    }),
    saveNotificationFail: (state) => ({
      ...state,
      isLoadingSaveNotification: false,
    }),
    setInfoLark: (state, action) => ({
      ...state,
      config: {
        ...state.config,
        infoLark: action.payload,
      },
    }),
    setNotification: (state, action) => ({
      ...state,
      config: {
        ...state.config,
        notification: action.payload,
      },
    }),
    setErrorConfig: (state, action) => ({
      ...state,
      errorConfig: action.payload,
    }),
    setErrorNotification: (state, action) => ({
      ...state,
      errorNotification: action.payload,
    }),
  },
});

export const {
  getConfig,
  getConfigSuccess,
  getConfigFailure,
  saveConfig,
  saveConfigSuccess,
  saveConfigFail,
  saveNotification,
  saveNotificationSuccess,
  saveNotificationFail,
  setInfoLark,
  setNotification,
  setErrorConfig,
  setErrorNotification,
} = configSlice.actions;
export default configSlice.reducer;
