import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Button, Input, Tooltip } from 'antd';
import Handle from '@/pages/Project/handle';
import { TYPE_SUBMIT } from '@/utils/constants';
import { createProjectSchema } from '../../schema';
import { copyToClipboard } from '@/utils/helper';
import IconKeySkeleton from '@/assets/images/icons/duotone/key-skeleton.svg'
import { getSecretKey } from '@/api/secretKey';
function ModalCreateProject() {
    const dispatch = useDispatch();
    const errorInfoProject = useSelector((state) => state.project.errorInfoProject);
    const isLoadingBtnCreateProject = useSelector((state) => state.project.isLoadingBtnCreateProject);
    const infoProject = useSelector((state) => state.project.infoProject);

    const errorInfoSecretKey = useSelector((state) => state.secretkey.errorInfoSecretKey);
    const infoSecretKey = useSelector(state => state.secretkey.secretKey)
    
    const {
        handleChangeInputInfo,
        handleFocus,
        handleCancelModalCreateProject,
        handleSubmit,
        handleGetKey,
    } = Handle();

    
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
                    placeholder={'Enter the project code'}
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
                        Name of Project
                    </label>
                </div>
                <Input
                    id='name'
                    value={infoProject.name}
                    onFocus={() => handleFocus('name')}
                    onChange={(e) => handleChangeInputInfo(e, 'name')}
                    className={`main-input ${errorInfoProject && errorInfoProject.name ? 'error-input' : ''}`}
                    placeholder={'Enter the project name'}
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

            <div className={`input-wrap`}>
                <div className='label-wrap'>
                    <label htmlFor='secret_key' className={`required`}>
                        Secret Key
                    </label>
                </div>
                <Input
                    id='secret_key'
                    value={console.log(infoSecretKey ? infoSecretKey : '')}
                    onFocus={() => handleFocus('secret_key')}
                    onChange={(e) => handleChangeInputInfo(e, 'secret_key')}
                    className={`main-input ${errorInfoSecretKey && errorInfoSecretKey.secret_key ? 'error-input' : ''}`}
                    placeholder={'Enter the secret key'}
/>

                {
                    errorInfoSecretKey && errorInfoSecretKey.secret_key
                }
                <div className='flex'>
                    <Button 
                    icon={<InlineSVG src={IconKeySkeleton} width={12 } />} 
                    className='border border-solid mt-[5px] mr-[5px] flex items-center' onClick={() => handleGetKey() }>Autogenerate Secret Key</Button>

                    <Button className='border border-solid mt-[5px]' disabled = {!infoProject.secret_key} 
                    onClick={()=>{copyToClipboard(infoProject.secret_key)}}>Copy</Button>
                </div>
            </div>

            <div className={`flex justify-center mt-8`}>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalCreateProject}
                >
                    Close
                </Button>
                <Button
                    loading={isLoadingBtnCreateProject}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.CREATE, createProjectSchema, infoProject)}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}

export default ModalCreateProject;
