import React, {useEffect} from 'react';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Button, Input } from 'antd';
import Handle from '@/pages/ProjectAdmin/handle';
import { TYPE_SUBMIT } from '@/utils/constants';
import { createProjectAdminSchema} from '../../schema';
import {setInfoProjectAdmin} from '@/states/modules/projectAdmin/index.js';
import _ from 'lodash';
import {copyToClipboard} from '@/utils/helper.js';
import IconKeySkeleton from '@/assets/images/icons/duotone/key-skeleton.svg';

function ModalCreateProjectAdmin() {
    const dispatch = useDispatch();
    const errorInfoProjectAdmin = useSelector((state) => state.projectAdmin.errorInfoProject);
    const isLoadingBtnCreateProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnCreateProjectAdmin);
    const infoProjectAdmin = useSelector((state) => state.projectAdmin.infoProject);
    const recommendKey = useSelector((state) => state.project.recommendKey);
    const isLoadingGenerateKey = useSelector((state) => state.project.isLoadingGenerateKey);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleCancelModalCreateProjectAdmin,
        handleSubmit,
        handleGetKey
    } = Handle();

    useEffect(() => {
        if (recommendKey) {
            const newInfoProject = _.cloneDeep(infoProjectAdmin);
            dispatch(setInfoProjectAdmin({
                ...newInfoProject,
                secret_key: recommendKey
            }));
        }
    }, [dispatch, recommendKey]);

    return (
        <div>
            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='code' className={`required`}>
                        Code
                    </label>
                </div>
                <Input
                    id='code'
                    value={infoProjectAdmin.code}
                    onFocus={() => handleFocus('code')}
                    onChange={(e) => handleChangeInputInfo(e, 'code')}
                    className={`main-input ${errorInfoProjectAdmin && errorInfoProjectAdmin.code ? 'error-input' : ''}`}
                    placeholder={'Enter the project code'}
                />
                {
                    errorInfoProjectAdmin && errorInfoProjectAdmin.code &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoProjectAdmin.code}
                    </span>
                }
            </div>

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='name' className={`required`}>
                        Name of Project
                    </label>
                </div>
                <Input
                    id='name'
                    value={infoProjectAdmin.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    className={`main-input ${errorInfoProjectAdmin && errorInfoProjectAdmin.name ? 'error-input' : ''}`}
                    placeholder={'Enter the project name'}
                />
                {
                    errorInfoProjectAdmin && errorInfoProjectAdmin.name &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoProjectAdmin.name}
                    </span>
                }
            </div>

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='secret_key' className={`required`}>
                        Secret Key
                    </label>
                </div>
                <Input
                    id='secret_key'
                    value={infoProjectAdmin.secret_key}
                    onFocus={() => handleFocus('secret_key')}
                    onChange={(e) => handleChangeInputInfo(e, 'secret_key')}
                    className={`main-input ${errorInfoProjectAdmin && errorInfoProjectAdmin.secret_key ? 'error-input' : ''}`}
                    placeholder={'Enter the secret key'}
                />
                 {
                    errorInfoProjectAdmin && errorInfoProjectAdmin.secret_key &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoProjectAdmin.secret_key}
                    </span>
                }
                <div className='flex'>
                    <Button
                        loading={isLoadingGenerateKey}
                        icon={<InlineSVG src={IconKeySkeleton} width={12} />}
                        className='border border-solid mt-[5px] mr-[5px] flex items-center'
                        onClick={() => handleGetKey()}>Autogenerate Secret Key</Button>

                    <Button className='border border-solid mt-[5px]' disabled={!infoProjectAdmin.secret_key}
                            onClick={() => {
                                copyToClipboard(infoProjectAdmin.secret_key);
                            }}>Copy</Button>
                </div>
            </div>

            <div className={`flex justify-center mt-8`}>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalCreateProjectAdmin}
                >
                    Close
                </Button>
                <Button
                    loading={isLoadingBtnCreateProjectAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createProjectAdminSchema, infoProjectAdmin)}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}

export default ModalCreateProjectAdmin;
