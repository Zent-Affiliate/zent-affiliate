import React, {useEffect} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Input} from 'antd';
import Handle from '@/pages/ProjectAdmin/handle';
import {TYPE_SUBMIT} from '@/utils/constants';
import {updateProjectAdminSchema} from '../../schema';
import IconKeySkeleton from '@/assets/images/icons/duotone/key-skeleton.svg';
import {setInfoProjectAdmin} from '@/states/modules/projectAdmin/index.js';
import _ from 'lodash';
import {copyToClipboard} from '@/utils/helper.js';

function ModalUpdateProjectAdmin() {
    const dispatch = useDispatch();
    const errorInfoProjectAdmin = useSelector((state) => state.projectAdmin.errorInfoProject);
    const isLoadingBtnUpdateProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnUpdateProjectAdmin);
    const infoProjectAdmin = useSelector((state) => state.projectAdmin.infoProject);
    const me = useSelector((state) => state.auth.me);
    const recommendKey = useSelector((state) => state.project.recommendKey);
    const isLoadingGenerateKey = useSelector((state) => state.project.isLoadingGenerateKey);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleCancelModalUpdateProjectAdmin,
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
                    <label htmlFor='codeUpdateProject' className={`required`}>
                        Code
                    </label>
                </div>
                <Input
                    id='codeUpdateProject'
                    value={infoProjectAdmin.code}
                    onChange={(e) => handleChangeInputInfo(e, 'code')}
                    onFocus={() => handleFocus('code')}
                    className={`main-input ${errorInfoProjectAdmin && errorInfoProjectAdmin.code ? 'error-input' : ''}`}
                    placeholder={'Enter code'}
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
                    <label htmlFor='nameUpdateProject' className={`required`}>
                        Name of Project
                    </label>
                </div>
                <Input
                    id='nameUpdateProject'
                    value={infoProjectAdmin.name}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    onFocus={() => handleFocus('name')}
                    className={`main-input ${errorInfoProjectAdmin && errorInfoProjectAdmin.name ? 'error-input' : ''}`}
                    placeholder={'Name of Project'}
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
                    <label htmlFor='secretKeyUpdateProject' className={`required`}>
                        Secret Key
                    </label>
                </div>
                <div  className='flex-1 mr-[5px]'>
                    <Input
                        id='secretKeyUpdateProject'
                        value={infoProjectAdmin.secret_key}
                        onChange={(e) => handleChangeInputInfo(e, 'secret_key')}
                        onFocus={() => handleFocus('secret_key')}
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
                </div>

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
                    loading={isLoadingBtnUpdateProjectAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE, updateProjectAdminSchema, infoProjectAdmin)}
                >
                    Update
                </Button>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalUpdateProjectAdmin}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default ModalUpdateProjectAdmin;
