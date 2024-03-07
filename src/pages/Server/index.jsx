import MainLayout from '@/layouts/MainLayout/index.jsx';
import React, {useEffect, useRef} from 'react';
import {Button, Input, Popover} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import PlusIcon from '@/assets/images/icons/light/plus.svg';
import InlineSVG from 'react-inlinesvg';
import Handle from './handle';
import {setBreadcrumb} from '@/states/modules/app';
import CardServerList from './components/CardServerList';
import ModalDefault from '@/components/Modal';
import ModalDeleteDefault from '@/components/ModalDelete';
import ModalDeleteServer from './components/DeleteModalServer';
import ModalCreateOrUpdateServer from './components/CreateOrUpdateModalServer';
import {handleDeleteServer} from '@/api/server';
import styles from './styles.module.scss';
import FilterPopover from './components/FilterPopover';
import FilterIcon from '@/assets/images/icons/duotone/filter-list.svg';
import {TYPE_SUBMIT} from '@/utils/constains';
import socketIOClient from 'socket.io-client';
import {setListDataServer} from '@/states/modules/server';
import store from '@/states/configureStore';
import {decryptData} from '@/utils/crypto';
import LoadingDataServer from './components/LoadingDataServer';

function Server() {
  const dispatch = useDispatch();
  const dataFilterServer = useSelector((state) => state.server.dataFilterServer);
  const infoServer = useSelector((state) => state.server.infoServer);
  const configModal = useSelector((state) => state.server.configModal);
  const visiblePopoverSelect = useSelector((state) => state.server.visiblePopoverSelect);
  const visibleModalDeleteServer = useSelector((state) => state.server.visibleModalDeleteServer);
  const visibleModalCreateOrUpdateServer = useSelector((state) => state.server.visibleModalCreateOrUpdateServer);
  const isLoadingBtnDeleteServer = useSelector((state) => state.server.isLoadingBtnDeleteServer);
  const socket = useRef();
  const dataListServers = useSelector((state) => state.server.servers);
  const isLoadingListServer = useSelector((state) => state.server.isLoadingListServer);
  
  const {
    handleShowModalCreateServer,
    handleCancelModalCreateOrUpdateServer,
    handleCancelModalDeleteServer,
    handleSearchServer,
    handleEnterSearchServer,
    handleScroll,
    handleOpenFilterServer,
  } = Handle();
  
  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: 'servers',
        name: 'Quản lý máy chủ',
      },
    ];
    dispatch(setBreadcrumb(dataBreadcrumb));
    
    return () => dispatch(setBreadcrumb([]));
  }, [dispatch]);
  
  useEffect(() => {
    socket.current = socketIOClient.connect(import.meta.env.VITE_API_URL);
    socket.current.on('getServer', (realTimeServer) => {
      const data = decryptData(realTimeServer.dataEncrypt);
      const {servers} = store.getState().server;
      const updateServers = servers.map(server => {
        const newServer = data?.find(item => server._id === item._id);
        
        return newServer || server;
      })
      dispatch(setListDataServer(updateServers));
    });
    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <MainLayout>
      <div className={`px-7`}>
        <div className={`flex justify-between mb-7`}>
          <div className={`w-96`}>
            <Input
              value={dataFilterServer.keySearch}
              onKeyDown={(e) => handleEnterSearchServer(e)}
              onChange={(e) => handleSearchServer(e.target.value)}
              prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt=""/>}
              className={`main-input`}
              placeholder="Tìm kiếm theo tên hoặc IP"
            />
          </div>
          
          <div className="flex">
            <Popover
              className="mr-2.5"
              content={<FilterPopover/>}
              placement="bottomRight"
              trigger={"click"}
              open={visiblePopoverSelect}
              onOpenChange={handleOpenFilterServer}
              title={
                <div className="px-6 border-b border-gray-200 border-solid">
                  <span className="text-[15px] !leading-[55px] text-black-content">Tùy chọn bộ lọc</span>
                </div>
              }
            >
              <Button
                icon={<InlineSVG src={FilterIcon} className={`w-4 h-4 fill-current`} alt=""/>}
                className={`flex items-center h-full !bg-blue-100 !text-blue-500 main-btn-primary hover:!bg-blue-500 hover:!text-white border-none`}
              >
                Bộ lọc
              </Button>
            </Popover>
            <Button
              icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} alt=""/>}
              className={`flex items-center ant-btn-primary h-full`}
              onClick={() => handleShowModalCreateServer(TYPE_SUBMIT.CREATE)}
            >
              Tạo mới
            </Button>
          </div>
        </div>
        
        <div
          className={styles.contentListServer}
          onScroll={(e) => handleScroll(e)}
        >
          <CardServerList/>
          {dataListServers?.length > 0 && isLoadingListServer ? <LoadingDataServer/> : ''}
        </div>
        
        <ModalDefault
          isModalOpen={visibleModalCreateOrUpdateServer}
          handleCancel={handleCancelModalCreateOrUpdateServer}
          title={configModal.type === TYPE_SUBMIT.CREATE ? configModal.title : configModal.title}
        >
          <ModalCreateOrUpdateServer/>
        </ModalDefault>
        
        <ModalDeleteDefault
          loading={isLoadingBtnDeleteServer}
          isModalOpen={visibleModalDeleteServer}
          handleCancel={handleCancelModalDeleteServer}
          handleConfirm={() => dispatch(handleDeleteServer(infoServer._id))}
          content={<ModalDeleteServer content={infoServer.name}/>}
          contentBtn="Xóa"
        />
      </div>
    </MainLayout>
  );
}

export default Server;
