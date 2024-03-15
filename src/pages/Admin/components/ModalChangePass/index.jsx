import React from 'react';
import InlineSVG from 'react-inlinesvg';
import {useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Input} from 'antd';
import Handle from './handle';
import HandleAdmin from '@/pages/Admin/handle';
import {TYPE_SUBMIT} from '@/utils/constains';
import {passwordAdminSchema} from '../../schema';

function ModalChangePassAdmin() {
    const dataChangePassAdmin = useSelector((state) => state.admin.dataChangePassAdmin);
    const errorDataChangePassAdmin = useSelector((state) => state.admin.errorDataChangePassAdmin);
    const isLoadingBtnChangePassWordAdmin = useSelector((state) => state.admin.isLoadingBtnChangePassWordAdmin);
    const {
        handleChangeInputInfo,
        handleFocus
    } = Handle();
    const {
        handleSubmit,
        handleCancelModalChangePass
    } = HandleAdmin();

    return (
        <div>
            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='new_password' className={`required`}>
                        Mật khẩu mới
                    </label>
                </div>
                <Input.Password
                    id='new_password'
                    value={dataChangePassAdmin.new_password}
                    onChange={(e) => handleChangeInputInfo(e, 'new_password')}
                    onFocus={() => handleFocus('new_password')}
                    className={`main-input ${
                        errorDataChangePassAdmin && errorDataChangePassAdmin.new_password ? 'error-input' : ''
                    }`}
                    placeholder={'Nhập mật khẩu mới'}
                />
                {
                    errorDataChangePassAdmin && errorDataChangePassAdmin.new_password &&
                    <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
                        {errorDataChangePassAdmin.new_password}
          </span>
                }
            </div>

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label className='required' htmlFor='confirm_password'>
                        Xác nhận mật khẩu
                    </label>
                </div>
                <Input.Password
                    id='confirm_password'
                    value={dataChangePassAdmin.confirm_password}
                    onChange={(e) => handleChangeInputInfo(e, 'confirm_password')}
                    onFocus={() => handleFocus('confirm_password')}
                    className={`main-input ${
                        errorDataChangePassAdmin && errorDataChangePassAdmin.confirm_password ? 'error-input' : ''
                    }`}
                    placeholder={'Xác nhận mật khẩu'}
                />
                {
                    errorDataChangePassAdmin && errorDataChangePassAdmin.confirm_password &&
                    <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
                        {errorDataChangePassAdmin.confirm_password}
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
                    loading={isLoadingBtnChangePassWordAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit('', passwordAdminSchema, dataChangePassAdmin)}
                >
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default ModalChangePassAdmin;
