import React, {useEffect} from 'react';
import InlineSVG from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import {Button, Input} from 'antd';
import Handle from '@/pages/Project/handle';
import {TYPE_SUBMIT} from '@/utils/constants';
import {createProjectSchema} from '../../schema';
import IconKeySkeleton from '@/assets/images/icons/duotone/key-skeleton.svg';
import {setInfoProject} from '@/states/modules/project/index.js';
import _ from 'lodash';

function ModalCreateProject() {
    const dispatch = useDispatch();
    const errorInfoProject = useSelector((state) => state.project.errorInfoProject);
    const isLoadingBtnCreateProject = useSelector((state) => state.project.isLoadingBtnCreateProject);
    const infoProject = useSelector((state) => state.project.infoProject);
    const recommendKey = useSelector((state) => state.project.recommendKey);
    const isLoadingGenerateKey = useSelector((state) => state.project.isLoadingGenerateKey);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleCancelModalCreateProject,
        handleSubmit,
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
                    <label htmlFor='code' className={`required`}>
                        Code
                    </label>
                </div>
                <Input
                    id='code'
                    value={infoProject.code}
                    onFocus={() => handleFocus('code')}
                    onChange={(e) => handleChangeInputInfo(e, 'code')}
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
                    <label htmlFor='name' className={`required`}>
                        Project name
                    </label>
                </div>
                <Input
                    id='name'
                    value={infoProject.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    className={`main-input ${errorInfoProject && errorInfoProject.name ? 'error-input' : ''}`}
                    placeholder={'Enter name'}
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
                    <label htmlFor='secret_key' className={`required`}>
                        Secret Key
                    </label>
                </div>
               <div className='flex-1 mr-[5px]'>
                    <Input
                        id='secret_key'
                        value={infoProject.secret_key}
                        onFocus={() => handleFocus('secret_key')}
                        onChange={(e) => handleChangeInputInfo(e, 'secret_key')}
                        className={`main-input ${errorInfoProject && errorInfoProject.secret_key ? 'error-input' : ''}`}
                        placeholder={'Enter secret key'}
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
                    loading={isLoadingBtnCreateProject}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createProjectSchema, infoProject)}
                >
                    Create
                </Button>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalCreateProject}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default ModalCreateProject;
