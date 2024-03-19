import React from 'react';
import './styles.scss';
import AuthLayout from '@/layouts/AuthLayout';
import {Button, Flex, Input} from 'antd';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import InlineSVG from 'react-inlinesvg';
import Handle from './handle.js';

function Login() {
    const {
        navigate,
        datFormLogin,
        errorLogin,
        isLoadingBtnLogin,
        handleChangeInput,
        handleFocus,
        handleConfirmLogin
    } = Handle();

    return (
        <AuthLayout title={'Sign In'} description={'Zent Affiliate Management System'}>
            <div className={'input-wrap'}>
                <Input
                    className={`base-input ${errorLogin && errorLogin.email.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Email'}
                    value={datFormLogin.email}
                    onChange={(e) => handleChangeInput(e, 'email')}
                    onFocus={(e) => handleFocus(e, 'email')}
                />
                {
                    errorLogin && errorLogin.email.length > 0 &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorLogin.email}
                    </span>
                }
            </div>

            <div className={'input-wrap mt-5'}>
                <Input.Password
                    className={`base-input !pt-[9px] !pb-[9px] ${errorLogin && errorLogin.password.length > 0 ? 'error-input' : ''}`}
                    placeholder={'Password'}
                    value={datFormLogin.password}
                    onChange={(e) => handleChangeInput(e, 'password')}
                    onFocus={(e) => handleFocus(e, 'password')}
                />
                {
                    errorLogin && errorLogin.password.length > 0 &&
                    <span className={'error'}>
                        <div className={'icon'}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorLogin.password}
                    </span>
                }
            </div>

            <Flex vertical gap='small'>
                <Button
                    loading={isLoadingBtnLogin}
                    type='primary'
                    onClick={() => handleConfirmLogin()}
                    size={'large'}
                    className={`main-btn-primary`}
                    block
                >
                    Log In
                </Button>
            </Flex>
        </AuthLayout>
    );
}

export default Login;
