import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
  infoLarkInit, 
  notificationInit, 
  setErrorConfig, 
  setErrorNotification, 
  setInfoLark, 
  setNotification
} from '@/states/modules/config';
import {validate} from '@/utils/validates';
import {CONFIG_TYPE} from '@/utils/constains';
import {handleConfig} from '@/api/config';
import { useEffect } from 'react';

export default function Handle() {
  const dispatch = useDispatch();
  const infoLarks = useSelector((state) => state.config.config.infoLark);
  const notifications = useSelector((state) => state.config.config.notification);
  const errorConfig = useSelector((state) => state.config.errorConfig);
  const errorNotification = useSelector((state) => state.config.errorNotification);

  useEffect(() => {
    if (!notifications) {
      dispatch(setNotification(notificationInit))
    } 
  }, [notifications])

  const handleChangeInputConfig = (valueInput, type, typeConfig) => {
    let data;
    if (typeConfig === CONFIG_TYPE.LARK_INFO) {
      data = _.cloneDeep(infoLarks) || infoLarkInit
      _.set(data, type, valueInput);
      dispatch(setInfoLark(data));
    } else if (typeConfig === CONFIG_TYPE.NOTIFICATION) {
      const valueTime = valueInput ? valueInput : undefined
      data = _.cloneDeep(notifications) || notificationInit
      _.set(data, type, valueTime);
      dispatch(setNotification(data));
    }
  };
  
  const handleSubmitConfig = (type, scheme, dataConfig) => {
    dataConfig = {
      type: type,
      ...dataConfig,
    };
    if (type === CONFIG_TYPE.LARK_INFO) {
      validate(scheme, dataConfig, {
        onSuccess: (data) => dispatch(handleConfig(data)),
        onError: (error) => dispatch(setErrorConfig(error)),
      });
    }
    if (type === CONFIG_TYPE.NOTIFICATION) {
      dataConfig = dataConfig ? {type: type, ...dataConfig} : notificationInit;
      validate(scheme, dataConfig, {
        onSuccess: (data) => dispatch(handleConfig(data)),
        onError: (error) => dispatch(setErrorNotification(error)),
      });
    }
  };

  const handleFocusConfig = (type, typeConfig) => {
    if (typeConfig === CONFIG_TYPE.LARK_INFO) {
      let dataError = _.cloneDeep(errorConfig);
      dataError[type] = '';
      dispatch(setErrorConfig(dataError));
    }
    if (typeConfig === CONFIG_TYPE.NOTIFICATION) {
      let dataError = _.cloneDeep(errorNotification);
      dataError[type] = '';
      dispatch(setErrorNotification(dataError));
    }
  };
  
  const handleSwitchChangeConfig = (checked, type) => {
    checked = Number(checked)
    let data = _.cloneDeep(notifications) || notificationInit;
    switch (type) {
      case 'notification_server':
        data.notification_server = checked;
        break;
      case 'notification_project':
        data.notification_project = checked;
        break;
      case 'notification_service':
        data.notification_service = checked;
        break;
      case 'notification_cpu':
        data.notification_cpu = checked;
        break;
      case 'notification_ram':
        data.notification_ram = checked;
        break;
      case 'notification_disk':
        data.notification_disk = checked;
        break;
      default:
        break;
    }
    dispatch(setNotification(data));
  };

  const handleChangePercentConfig = (percent, type) => {
    let data = _.cloneDeep(notifications) || notificationInit;
    switch (type) {
      case 'warning_cpu':
        data.warning_cpu = percent;
        break;
      case 'warning_ram':
        data.warning_ram = percent;
        break;
      case 'warning_disk':
        data.warning_disk = percent;
        break;
      default:
        break;
    }
    dispatch(setNotification(data));
  };

  const handleChangeType = (value) => {
    let data = _.cloneDeep(notifications) || notificationInit;
    data.notification_time_type = value;
    dispatch(setNotification(data));
  };

  return {
    infoLarks,
    notifications,
    errorConfig,
    errorNotification,
    handleFocusConfig,
    handleSubmitConfig,
    handleChangeInputConfig,
    handleSwitchChangeConfig,
    handleChangePercentConfig,
    handleChangeType,   
  };
}
