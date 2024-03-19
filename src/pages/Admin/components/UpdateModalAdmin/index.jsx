import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Button, Input, Switch, Tooltip } from 'antd';
import Handle from '@/pages/Admin/handle';
import { TYPE_SUBMIT } from '@/utils/constants';
import { setInfoAdmin } from '@/states/modules/admin';
import { updateAdminSchema } from '../../schema';

function ModalUpdateAdmin() {
    const dispatch = useDispatch();
    const errorInfoAdmin = useSelector((state) => state.admin.errorInfoAdmin);
    const isLoadingBtnUpdateAdmin = useSelector((state) => state.admin.isLoadingBtnUpdateAdmin);
    const infoAdmin = useSelector((state) => state.admin.infoAdmin);
    const me = useSelector((state) => state.auth.me);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleSwitchChange,
        handleSubmit,
        handleCancelModalUpdateAdmin
    } = Handle();

    return (
        <div>
            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='nameUpdateAdmin' className={`required`}>
                        Name
                    </label>
                </div>
                <Input
                    id='nameUpdateAdmin'
                    value={infoAdmin.name}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    onFocus={() => handleFocus('name')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.name ? 'error-input' : ''}`}
                    placeholder={'Nhập Name'}
                />
                {
                    errorInfoAdmin && errorInfoAdmin.name &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoAdmin.name}
                    </span>
                }
            </div>

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='emailUpdateAdmin' className={`required`}>
                        Email
                    </label>
                </div>
                <Input
                    id='emailUpdateAdmin'
                    value={infoAdmin.email}
                    onChange={(e) => handleChangeInputInfo(e, 'email')}
                    onFocus={() => handleFocus('email')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.email ? 'error-input' : ''}`}
                    placeholder={'Nhập email'}
                />
                {
                    errorInfoAdmin && errorInfoAdmin.email &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoAdmin.email}
                    </span>
                }
            </div>

            {/* <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='passwordUpdateAdmin' className={`required`}>
                        Password
                    </label>
                </div>
                <Input.Password
                    id='passwordUpdateAdmin'
                    value={infoAdmin.password}
                    onChange={(e) => handleChangeInputInfo(e, 'password')}
                    onFocus={() => handleFocus('password')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.password ? 'error-input' : ''}`}
                    placeholder={'Enter password'}
                />
                {
                    errorInfoAdmin && errorInfoAdmin.email &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoAdmin.password}
                    </span>
                }
            </div> */}

            <div className={`flex justify-center mt-8`}>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalUpdateAdmin}
                >
                    Close
                </Button>
                <Button
                    loading={isLoadingBtnUpdateAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE , updateAdminSchema, infoAdmin)}
                >
                    Update
                </Button>
            </div>
        </div>
    );
}

export default ModalUpdateAdmin;
