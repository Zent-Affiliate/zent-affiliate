import React from 'react';
import {useSelector} from 'react-redux';
import Handle from '@/pages/Server/handle';
import {Button, Input, Select} from 'antd';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {TYPE_SUBMIT} from '@/utils/constains';
import {createServerSchema, updateServerSchema} from '@/pages/Server/schema';
import ModalDeleteDefault from '@/components/ModalDelete';

function ModalCreateOrUpdateServer() {
  const errorInfoServer = useSelector((state) => state.server.errorInfoServer);
  const visibleModalWarningServer = useSelector((state) => state.server.visibleModalWarningServer);
  const isLoadingBtnUpdateServer = useSelector((state) => state.server.isLoadingBtnUpdateServer);
  const isLoadingBtnCreateServer = useSelector((state) => state.server.isLoadingBtnCreateServer);
  const infoServer = useSelector((state) => state.server.infoServer);
  const dataListTags = useSelector((state) => state.tag.tags);
  const configModal = useSelector((state) => state.server.configModal);
  const tagList = dataListTags?.map((tag) => ({value: tag._id, label: tag.name}));
  
  const {
    handleCancelModalWarningServer,
    handleCancelModalCreateOrUpdateServer,
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleSubmitUpdateServer,
  } = Handle();
  
  return (
    <div>
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="name" className={`required`}>Tên máy chủ</label>
        </div>
        <Input
          id="name"
          value={infoServer.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
          className={`main-input ${errorInfoServer && errorInfoServer.name ? 'error-input' : ''}`}
          placeholder={'Nhập tên server'}
        />
        {
          errorInfoServer && errorInfoServer.name &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoServer.name}
            </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="ip" className={`required`}>IP</label>
        </div>
        <Input
          id="ip"
          value={infoServer.ip}
          onFocus={() => handleFocus('ip')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'ip')}
          className={`main-input ${errorInfoServer && errorInfoServer.ip ? 'error-input' : ''}`}
          placeholder={'Nhập IP'}
        />
        {
          errorInfoServer && errorInfoServer.ip &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoServer.ip}
            </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="tags">Nhãn máy chủ</label>
        </div>
        <Select
          className={'main-select w-full'}
          value={infoServer?.tags ? infoServer?.tags : null}
          mode={"tags"}
          allowClear
          showSearch={false}
          placeholder="Chọn nhãn server"
          onChange={(value) => handleChangeInputInfo(value, 'tags')}
          options={tagList}
          filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
        />
        {
          errorInfoServer && errorInfoServer.tags &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoServer.tags}
            </span>
        }
      </div>
      
      <ModalDeleteDefault
        loading={isLoadingBtnUpdateServer}
        isModalOpen={visibleModalWarningServer}
        handleCancel={handleCancelModalWarningServer}
        handleConfirm={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateServerSchema, infoServer)}
        content={
          <>Đã có dự án tồn tại tại trên máy chủ <strong>{infoServer.name || ""}</strong>. Bạn có chắc chắn muốn cập nhật không?</>
        }
        contentBtn="Xác nhận"
        type='warning'
      />
      
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateOrUpdateServer}
        >
          Đóng
        </Button>
        
        {
          configModal.type === TYPE_SUBMIT.CREATE ?
            <Button
              loading={isLoadingBtnCreateServer}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createServerSchema, infoServer)}
            >
              Tạo mới
            </Button> :
            <Button
              loading={isLoadingBtnUpdateServer}
              className={`ant-btn-primary mx-[5px]`}
              size={'large'}
              onClick={() => handleSubmitUpdateServer(TYPE_SUBMIT.UPDATE, updateServerSchema, infoServer)}
            >
              Cập nhật
            </Button>
        }
      </div>
    </div>
  )
}

export default ModalCreateOrUpdateServer;
