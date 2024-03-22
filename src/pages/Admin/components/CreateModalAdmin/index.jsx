import React from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Input, Tooltip} from 'antd';
import Handle from '@/pages/Admin/handle';
import {TYPE_SUBMIT} from '@/utils/constants';
import {createAdminSchema} from '../../schema';

function ModalCreateAdmin() {
    const dispatch = useDispatch();
    const errorInfoAdmin = useSelector((state) => state.admin.errorInfoAdmin);
    const isLoadingBtnCreateAdmin = useSelector((state) => state.admin.isLoadingBtnCreateAdmin);
    const infoAdmin = useSelector((state) => state.admin.infoAdmin);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleCancelModalCreateAdmin,
        handleSubmit
    } = Handle();

    return (
        <div>
            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='name' className={`required`}>
                        Name of Admin
                    </label>
                </div>
                <Input
                    id='name'
                    value={infoAdmin.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.name ? 'error-input' : ''}`}
                    placeholder={'Enter name'}
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
                    <label htmlFor='email' className={`required`}>
                        Email
                    </label>
                </div>
                <Input
                    id='email'
                    value={infoAdmin.email}
                    onFocus={() => handleFocus('email')}
                    onChange={(e) => handleChangeInputInfo(e, 'email')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.email ? 'error-input' : ''}`}
                    placeholder={'Enter email'}
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

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='password' className={`required`}>
                        Password
                    </label>
                </div>
                <Input.Password
                    id='password'
                    value={infoAdmin.password}
                    onFocus={() => handleFocus('password')}
                    onChange={(e) => handleChangeInputInfo(e, 'password')}
                    className={`main-input ${errorInfoAdmin && errorInfoAdmin.password ? 'error-input' : ''}`}
                    placeholder={'Enter password'}
                />
                {
                    errorInfoAdmin && errorInfoAdmin.password &&
                    <span className={`error`}>
            <div className={`icon`}>
              <InlineSVG src={IconWarning} width={14} height={14} />
            </div>
                        {errorInfoAdmin.password}
          </span>
                }
            </div>

            <div className={`flex justify-center mt-8`}>
                <Button
                    loading={isLoadingBtnCreateAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit( TYPE_SUBMIT.CREATE ,createAdminSchema, infoAdmin)}
                >
                    Create
                </Button>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalCreateAdmin}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default ModalCreateAdmin;
