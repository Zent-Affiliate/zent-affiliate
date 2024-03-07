import React from 'react'
import InlineSVG from 'react-inlinesvg'
import {useSelector} from 'react-redux'
import IconWarning from '@/assets/images/icons/light/warning.svg'
import {Button, Input} from 'antd'
import Handle from './handle'
import HandleUser from '@/pages/User/handle'
import {TYPE_SUBMIT} from '@/utils/constains'
import {passwordUserSchema} from '../../schema'

function ModalChangePassUser() {
  const dataChangePassUser = useSelector((state) => state.user.dataChangePassUser)
  const errorDataChangePassUser = useSelector((state) => state.user.errorDataChangePassUser)
  const isLoadingBtnChangePassWordUser = useSelector((state) => state.user.isLoadingBtnChangePassWordUser)
  const {
    handleChangeInputInfo,
    handleFocus
  } = Handle()
  const {
    handleSubmit,
    handleCancelModalChangePass
  } = HandleUser()
  
  return (
    <div>
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label htmlFor="new_password" className={`required`}>
            Mật khẩu mới
          </label>
        </div>
        <Input.Password
          id="new_password"
          value={dataChangePassUser.new_password}
          onChange={(e) => handleChangeInputInfo(e, 'new_password')}
          onFocus={() => handleFocus('new_password')}
          className={`main-input ${
            errorDataChangePassUser && errorDataChangePassUser.new_password ? 'error-input' : ''
          }`}
          placeholder={'Nhập mật khẩu mới'}
        />
        {
          errorDataChangePassUser && errorDataChangePassUser.new_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassUser.new_password}
          </span>
        }
      </div>
      
      <div className={`input-wrap`}>
        <div className="label-wrap">
          <label className="required" htmlFor="confirm_password">
            Xác nhận mật khẩu
          </label>
        </div>
        <Input.Password
          id="confirm_password"
          value={dataChangePassUser.confirm_password}
          onChange={(e) => handleChangeInputInfo(e, 'confirm_password')}
          onFocus={() => handleFocus('confirm_password')}
          className={`main-input ${
            errorDataChangePassUser && errorDataChangePassUser.confirm_password ? 'error-input' : ''
          }`}
          placeholder={'Xác nhận mật khẩu'}
        />
        {
          errorDataChangePassUser && errorDataChangePassUser.confirm_password &&
          <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14}/>
            </div>
            {errorDataChangePassUser.confirm_password}
          </span>
        }
      </div>
      
      <div className={`flex justify-center mt-8`}>
        <Button
          className={`ant-btn-close mx-[5px]`}
          size={'large'}
          onClick={handleCancelModalChangePass}
        >
          Đóng
        </Button>
        <Button
          loading={isLoadingBtnChangePassWordUser}
          className={`ant-btn-primary mx-[5px]`}
          size={'large'}
          onClick={() => handleSubmit(TYPE_SUBMIT.CHANGE_PASSWORD, passwordUserSchema, dataChangePassUser)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default ModalChangePassUser
