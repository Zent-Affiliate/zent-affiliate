import React from 'react'
import IconEditAvatar from '@/assets/images/icons/duotone/pencil.svg'
import InlineSVG from 'react-inlinesvg'
import {useDispatch, useSelector} from 'react-redux'
import avatarDefault from '@/assets/images/user/default-avatar-point.png'
import Close from '@/assets/images/icons/duotone/xmark.svg'
import {setInfoUser} from '@/states/modules/user'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import {Button, Input, Switch, Tooltip} from 'antd'
import Handle from '@/pages/User/handle'
import {updateUserSchema} from '@/pages/User/schema'
import {TYPE_SUBMIT} from '@/utils/constains'

function ModalUpdateUser() {
  const dispatch = useDispatch()
  const errorInfoUser = useSelector((state) => state.user.errorInfoUser)
  const isLoadingBtnUpdateUser = useSelector((state) => state.user.isLoadingBtnUpdateUser)
  const infoUser = useSelector((state) => state.user.infoUser)
  const authUser = useSelector((state) => state.auth.authUser)
  
  const {
    handleChangeAvatar,
    handleChangeInputInfo,
    handleFocus,
    handleSwitchChange,
    handleSubmit,
    handleCancelModalUpdateUser,
  } = Handle()
  
  return (
    <div>
      <div className={`input-wrap mb-6`}>
        <div className={`label-wrap`}>Ảnh đại diện</div>
        <div className={`flex`}>
          <input
            id={'imageUploadUpdate'}
            type="file"
            accept="image/*"
            className={`hidden`}
            onChange={(file) => handleChangeAvatar(file)}
          />
          
          <Tooltip title="Chỉnh sửa ảnh đại diện">
            <label
              className={`w-[30px] h-[30px] bg-white shadow rounded-[50%] flex justify-center items-center absolute z-10 left-[145px] top-[125px] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
              htmlFor="imageUploadUpdate"
            >
              <InlineSVG src={IconEditAvatar} alt="" className={`w-3.5 h-3.5`}/>
            </label>
          </Tooltip>
          
          <Tooltip title="Xóa ảnh đại diện">
            <div
              className={`w-[30px] h-[30px] bg-white shadow rounded-[50%] flex justify-center items-center absolute z-10 left-[145px] top-[250px] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
              onClick={() => dispatch(setInfoUser({...infoUser, avatarUrl: '', avatar: ''}))}
            >
              <InlineSVG src={Close} alt="" className={`w-3.5 h-3.5`}/>
            </div>
          </Tooltip>
        </div>
        <div className={`relative`}>
          <img
            src={infoUser.avatarUrl ? infoUser.avatarUrl : avatarDefault}
            crossOrigin="anonymous"
            alt=""
            className={`w-32 h-32 shadow border-white rounded-[8px] border-[3px] object-cover`}
          />
        </div>
        {
          errorInfoUser && errorInfoUser.avatar &&
          <span className={`error !mt-[22px]`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorInfoUser.avatar}
          </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="nameUpdateUser" className={`required`}>
            Họ và tên
          </label>
        </div>
        <Input
          id="nameUpdateUser"
          value={infoUser.name}
          onChange={(e) => handleChangeInputInfo(e, 'name')}
          onFocus={() => handleFocus('name')}
          className={`main-input ${errorInfoUser && errorInfoUser.name ? 'error-input' : ''}`}
          placeholder={'Nhập họ và tên'}
        />
        {
          errorInfoUser && errorInfoUser.name &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorInfoUser.name}
          </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="emailUpdateUser" className={`required`}>
            Email
          </label>
        </div>
        <Input
          id="emailUpdateUser"
          value={infoUser.email}
          onChange={(e) => handleChangeInputInfo(e, 'email')}
          onFocus={() => handleFocus('email')}
          className={`main-input ${errorInfoUser && errorInfoUser.email ? 'error-input' : ''}`}
          placeholder={'Nhập email'}
        />
        {
          errorInfoUser && errorInfoUser.email &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorInfoUser.email}
          </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap ">
          <label htmlFor="phoneUpdateUser" className="cursor-pointer">
            Số điện thoại
          </label>
        </div>
        <Input
          id="phoneUpdateUser"
          value={infoUser.phone}
          onChange={(e) => handleChangeInputInfo(e, 'phone')}
          onFocus={() => handleFocus('phone')}
          className={`main-input ${errorInfoUser && errorInfoUser.phone ? 'error-input' : ''}`}
          placeholder={'Nhập số điện thoại'}
        />
        {
          errorInfoUser && errorInfoUser.phone &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorInfoUser.phone}
          </span>
        }
      </div>
      
      {
        authUser._id !== infoUser._id &&
        <div className={`input-wrap`}>
          <div className="label-wrap">Trạng thái</div>
          <Switch
            className={`main-switch ${errorInfoUser && errorInfoUser.status ? 'error-input' : ''}`}
            checked={infoUser.status}
            onChange={(checked) => handleSwitchChange(checked)}
          />
          {
            errorInfoUser && errorInfoUser.status &&
            <span className={`error`}>
              <div className={`icon`}>
                <InlineSVG src={IconWarning} width={14} height={14}/>
              </div>
              {errorInfoUser.status}
            </span>
          }
        </div>
      }
      
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalUpdateUser}
        >
          Đóng
        </Button>
        <Button
          loading={isLoadingBtnUpdateUser}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateUserSchema, infoUser)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default ModalUpdateUser
