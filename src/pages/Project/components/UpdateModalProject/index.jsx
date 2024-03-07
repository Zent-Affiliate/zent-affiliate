import React from 'react'
import InlineSVG from 'react-inlinesvg';
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {Button, Input} from 'antd';
import Handle from '@/pages/Project/handle';
import {updateProjectSchema} from '../../schema';
import {Select} from 'antd';
import {TYPE_SUBMIT} from '@/utils/constains';

function ModalUpdateProject() {
  
  const {
    handleChangeInputInfo,
    handleFocus,
    handleSubmit,
    handleCancelModalUpdateProject,
    infoProject,
    errorInfoProject,
    optionServer,
    optionTag,
    isLoadingBtnUpdateProject
  } = Handle()
  
  return (
    <>
      <div className={`input-wrap`}>
        <div className='label-wrap'>
          <label htmlFor="nameUpdateProject" className={`required`}>
            Tên dự án
          </label>
        </div>
        <Input
          id='nameUpdateProject'
          value={infoProject?.name}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
          onFocus={() => handleFocus('name')}
          className={`main-input ${errorInfoProject && errorInfoProject.name ? 'error-input' : ''}`}
          placeholder={'Nhập tên dự án'}
        />
        {
          errorInfoProject && errorInfoProject.name &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoProject.name}
            </span>
        }
      </div>
      <div className={`input-wrap`}>
        <div className='label-wrap'>
          <label htmlFor='domainUpdateProject' className={`required`}>
            Link dự án
          </label>
        </div>
        <Input
          id='domainUpdateProject'
          value={infoProject?.domain}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'domain')}
          onFocus={() => handleFocus('domain')}
          className={`main-input ${errorInfoProject && errorInfoProject.domain ? 'error-input' : ''}`}
          placeholder={'Nhập link dự án'}
        />
        {
          errorInfoProject && errorInfoProject.domain &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoProject.domain}
            </span>
        }
      </div>
      <div className={`input-wrap`}>
        <div className='label-wrap'>
          <label htmlFor='server' className={`required`}>
            Máy chủ
          </label>
        </div>
        <Select
          className={'main-select w-full !z-50 !rounded-md'}
          style={errorInfoProject && errorInfoProject.server ? {border: '1px solid #fecaca'} : ''}
          value={infoProject.server}
          placeholder="Chọn máy chủ"
          onChange={(value) => handleChangeInputInfo(value, 'server')}
          allowClear
          options={optionServer}
        />
        {
          errorInfoProject && errorInfoProject.server &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoProject.server}
            </span>
        }
      </div>
      <div className={`input-wrap`}>
        <div className='label-wrap'>
          <label htmlFor='tags'>
            Nhãn dự án
          </label>
        </div>
        <Select
          className={'main-select w-full'}
          mode="tags"
          value={infoProject.tags}
          allowClear
          showSearch={false}
          placeholder="Chọn nhãn dự án"
          onChange={(value) => handleChangeInputInfo(value, 'tags')}
          options={optionTag}
          filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
        />
      </div>
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalUpdateProject}
        >
          Đóng
        </Button>
        <Button
          loading={isLoadingBtnUpdateProject}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateProjectSchema, infoProject)}
        >
          Cập nhật
        </Button>
      </div>
    </>
  )
}

export default ModalUpdateProject
