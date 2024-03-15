import React, {useEffect} from 'react';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Button, Input, Switch, Tooltip } from 'antd';
import Handle from '@/pages/Project/handle';
import { TYPE_SUBMIT } from '@/utils/constants';
import { setInfoAdmin } from '@/states/modules/admin';
import { updateProjectSchema } from '../../schema';
import IconKeySkeleton from '@/assets/images/icons/duotone/key-skeleton.svg';
import {copyToClipboard} from '@/utils/helper.js';
import _ from 'lodash';
import {setInfoProject} from '@/states/modules/project/index.js';

function ModalUpdateProject() {
    const dispatch = useDispatch();
    const errorInfoProject = useSelector((state) => state.project.errorInfoProject);
    const isLoadingBtnUpdateProject = useSelector((state) => state.project.isLoadingBtnUpdateProject);
    const infoProject = useSelector((state) => state.project.infoProject);
    const me = useSelector((state) => state.auth.me);
    const recommendKey = useSelector((state) => state.project.recommendKey);
    const isLoadingGenerateKey = useSelector((state) => state.project.isLoadingGenerateKey);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleCancelModalUpdateProject,
        handleGetKey
    } = Handle();

    useEffect(() => {
        if (recommendKey) {
            const newInfoProject = _.cloneDeep(infoProject);
            dispatch(setInfoProject({
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
                    value={infoProject.code}
                    onChange={(e) => handleChangeInputInfo(e, 'code')}
                    onFocus={() => handleFocus('code')}
                    className={`main-input ${errorInfoProject && errorInfoProject.code ? 'error-input' : ''}`}
                    placeholder={'Enter code'}
                />
                {
                    errorInfoProject && errorInfoProject.code &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoProject.code}
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
                    value={infoProject.name}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    onFocus={() => handleFocus('name')}
                    className={`main-input ${errorInfoProject && errorInfoProject.name ? 'error-input' : ''}`}
                    placeholder={'Name of Project'}
                />
                {
                    errorInfoProject && errorInfoProject.name &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorInfoProject.name}
                    </span>
                }
            </div>

            <div className={`input-wrap relative`}>
                <div className='label-wrap'>
                    <label htmlFor='secretKeyUpdateProject' className={`required`}>
                        Secret Key
                    </label>
                </div>
                <div className='flex-1 mr-[5px]'>
                    <Input
                        id='secretKeyUpdateProject'
                        value={infoProject.secret_key}
                        onChange={(e) => handleChangeInputInfo(e, 'secret_key')}
                        onFocus={() => handleFocus('secret_key')}
                        className={`main-input ${errorInfoProject && errorInfoProject.secret_key ? 'error-input' : ''}`}
                        placeholder={'Enter the secret key'}
                    />
                    {
                        errorInfoProject && errorInfoProject.secret_key &&
                        <span className={`error`}>
                            <div className={`icon`}>
                                <InlineSVG src={IconWarning} width={14} height={14} />
                            </div>
                            {errorInfoProject.secret_key}
                        </span>
                    }
                </div>

                <div className='flex'>
                    <Button
                        loading={isLoadingGenerateKey}
                        icon={<InlineSVG src={IconKeySkeleton} width={12} />}
                        className='flex border border-solid mt-[3px] mr-[5px] items-center absolute right-0 top-[30px]'
                        onClick={() => handleGetKey()}
                    >
                        Generate key
                    </Button>
                </div>
            </div>

            <div className={`flex justify-center mt-8`}>
                <Button
                    loading={isLoadingBtnUpdateProject}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE , updateProjectSchema, infoProject)}
                >
                    Update 
                </Button>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalUpdateProject}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default ModalUpdateProject;
