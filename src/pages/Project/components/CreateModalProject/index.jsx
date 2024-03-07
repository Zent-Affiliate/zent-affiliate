import React from 'react'
import InlineSVG from 'react-inlinesvg';
import IconWarning from "@/assets/images/icons/light/warning.svg";
import {Button, Input} from 'antd';
import Handle from '../../handle';
import {Select} from 'antd';
import {TYPE_SUBMIT} from '@/utils/constains';
import {createProjectSchema} from '../../schema';

function ModalCreateProject() {
  
  const {
    handleChangeInputInfo,
    handleFocus,
    handleCancelModalCreateProject,
    handleSubmit,
    infoProject,
    errorInfoProject,
    optionServer,
    optionTag,
    isLoadingBtnCreateProject
  } = Handle()
  
  return (
    <>
      <div className={`input-wrap`}>
        <div className='label-wrap'>
          <label htmlFor="name" className={`required`}>
            Tên dự án
          </label>
        </div>
        <Input
          id='name'
          value={infoProject?.name}
          onFocus={() => handleFocus('name')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'name')}
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
          <label htmlFor='domain' className={`required`}>
            Link dự án
          </label>
        </div>
        <Input
          id='domain'
          value={infoProject?.domain}
          onFocus={() => handleFocus('domain')}
          onChange={(e) => handleChangeInputInfo(e.target.value, 'domain')}
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
        <div className='label-wrap '>
          <label htmlFor='server' className={`required`}>
            Máy chủ
          </label>
        </div>
        <Select
          className={'main-select w-full !z-50 !rounded-md'}
          style={errorInfoProject && errorInfoProject.server ? {border: '1px solid #fecaca'} : ''}
          value={infoProject?.server ? infoProject.server : null}
          size={'middle'}
          allowClear
          placeholder="Chọn máy chủ"
          onChange={(value) => handleChangeInputInfo(value, 'server')}
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
          value={infoProject?.tags ? infoProject.tags : null}
          mode="tags"
          placeholder="Chọn nhãn dự án"
          allowClear
          showSearch={false}
          onChange={(value) => handleChangeInputInfo(value, 'tags')}
          options={optionTag}
        />
        {
          errorInfoProject && errorInfoProject.tags &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoProject.tags}
            </span>
        }
      </div>
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalCreateProject}
        >
          Đóng
        </Button>
        <Button
          loading={isLoadingBtnCreateProject}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createProjectSchema, infoProject, optionTag)}
        >
          Tạo mới
        </Button>
      </div>
    </>
  )
}

export default ModalCreateProject
