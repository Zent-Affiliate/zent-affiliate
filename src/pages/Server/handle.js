import {useDispatch, useSelector} from 'react-redux';
import {
  clearListServer,
  setConfigModal,
  setDataFilterServer,
  setErrorInfoServer,
  setInfoServer,
  setVisibleModalDeleteServer,
  setVisibleModalCreateOrUpdateServer,
  setVisibleModalWarningServer,
  setVisiblePopoverSelect,
} from '@/states/modules/server';
import {getListServers, handleCreateServer, handleUpdateServer} from '@/api/server';
import _ from 'lodash';
import {TYPE_SUBMIT} from '@/utils/constains';
import {validate} from '@/utils/validates';

export default function Handle() {
  const dispatch = useDispatch()
  const infoServer = useSelector((state) => state.server.infoServer);
  const errorInfoServer = useSelector((state) => state.server.errorInfoServer);
  const dataFilterServer = useSelector((state) => state.server.dataFilterServer);
  const isLoadingListServer = useSelector((state) => state.server.isLoadingListServer);
  const paginationListServers = useSelector((state) => state.server.paginationListServers);
  
  const handleCancelModalCreateOrUpdateServer = () => {
    dispatch(
      setErrorInfoServer({
        name: '',
        ip: '',
        tags: '',
      })
    );
    dispatch(
      setInfoServer({
        name: '',
        ip: '',
        tags: [],
      })
    );
    dispatch(setVisibleModalCreateOrUpdateServer(false));
  }
  
  const handleShowModalCreateServer = (type) => {
    dispatch(
      setInfoServer({
        name: '',
        ip: '',
        tags: [],
      })
    );
    dispatch(setConfigModal({
      title: "Tạo mới server",
      type
    }));
    dispatch(setVisibleModalCreateOrUpdateServer(true));
  }
  
  const handleCancelModalDeleteServer = () => {
    dispatch(setVisibleModalDeleteServer(false));
  }
  
  const handleSearchServer = (value) => {
    dispatch(setDataFilterServer({
      ...dataFilterServer,
      keySearch: value,
    }));
    if (!value) {
      dispatch(clearListServer());
      dispatch(getListServers());
    }
  }
  
  const handleEnterSearchServer = (event) => {
    if (event.key === 'Enter') {
      dispatch(clearListServer());
      dispatch(getListServers());
    }
  }
  
  const handleChangeInputInfo = (value, type) => {
    let data = _.cloneDeep(infoServer);
    let dataError = _.cloneDeep(errorInfoServer);
    if (type === 'tags') {
      const newValue = value.filter(tag => tag.trim() !== '');
      data[type] = newValue;
    } else {
      data[type] = value;
    }
    dataError[type] = '';
    dispatch(setInfoServer(data));
    dispatch(setErrorInfoServer(dataError));
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoServer);
    dataError[type] = '';
    dispatch(setErrorInfoServer(dataError));
  }
  
  const handleSubmit = (type, schema, dataServer) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(schema, dataServer, {
        onSuccess: (data) => dispatch(handleCreateServer(data)),
        onError: (error) => dispatch(setErrorInfoServer(error)),
      });
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(schema, dataServer, {
        onSuccess: (data) => dispatch(handleUpdateServer(data.id, data)),
        onError: (error) => dispatch(setErrorInfoServer(error)),
      })
    }
  }
  
  const handleScroll = (e) => {
    const element = e.target
    const {currentPage, perPage} = paginationListServers
    if (
      element.scrollHeight - element.scrollTop - element.clientHeight < 9
      && !isLoadingListServer && (currentPage * perPage) < paginationListServers.totalRecord
    ) {
      dispatch(setDataFilterServer({
        ...dataFilterServer,
        page: paginationListServers.currentPage + 1,
        perPage: 9,
      }));
      dispatch(getListServers());
    }
  }
  
  const handleFilterServer = (type, value) => {
    if (type === 'status') {
      dispatch(setDataFilterServer({
        ...dataFilterServer,
        status: value
      }));
    }
    if (type === 'tags') {
      dispatch(setDataFilterServer({
        ...dataFilterServer,
        tags: value
      }));
    }
  }
  
  const handleOpenFilterServer = (newData) => {
    dispatch(setVisiblePopoverSelect(newData));
  }
  
  const handleFilter = () => {
    dispatch(setVisiblePopoverSelect(false));
    dispatch(clearListServer());
    dispatch(getListServers());
  }
  
  const handleCancelModalWarningServer = () => {
    dispatch(setVisibleModalWarningServer(false));
  }
  
  const handleSubmitUpdateServer = (type, schema, dataServer) => {
    const warning = (data) => {
      if(infoServer.totalProject > 0 && infoServer.other_ip !== infoServer.ip) {
        dispatch(setVisibleModalWarningServer(true));
      }else {
        dispatch(handleUpdateServer(data.id, data));
      }
    }
    validate(schema, dataServer, {
      onSuccess: (data) => warning(data),
      onError: (error) => dispatch(setErrorInfoServer(error)),
    })
  }
  
  return {
    handleShowModalCreateServer,
    handleCancelModalCreateOrUpdateServer,
    handleCancelModalDeleteServer,
    handleCancelModalWarningServer,
    handleSearchServer,
    handleEnterSearchServer,
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleScroll,
    handleOpenFilterServer,
    handleFilterServer,
    handleFilter,
    handleSubmitUpdateServer,
  }
}
