import React from 'react';
import InlineSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import IconWarning from '@/assets/images/icons/light/warning.svg';
import { Button, Input, Switch, Tooltip } from 'antd';
import Handle from '@/pages/ProjectAdmin/handle';
import { TYPE_SUBMIT } from '@/utils/constains';
import { setInfoAdmin } from '@/states/modules/admin';
import { updateProjectAdminSchema} from '../../schema';

function ModalUpdateProjectAdmin() {
    const dispatch = useDispatch();
    const errorInfoProjectAdmin = useSelector((state) => state.projectAdmin.errorInfoProjectAdmin);
    const isLoadingBtnUpdateProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnUpdateProjectAdmin);
    const infoProjectAdmin = useSelector((state) => state.projectAdmin.infoProject);
    const me = useSelector((state) => state.auth.me);

    const {
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleCancelModalUpdateProjectAdmin
    } = Handle();

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
                    value={infoProject.name}
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

            <div className={`flex justify-center mt-8`}>
                <Button
                    className={`ant-btn-close mx-[5px]`}
                    size={'large'}
                    onClick={handleCancelModalUpdateProjectAdmin}
                >
                    Đóng
                </Button>
                <Button
                    loading={isLoadingBtnUpdateProjectAdmin}
                    className={`ant-btn-primary mx-[5px]`}
                    size={'large'}
                    onClick={() => handleSubmit(TYPE_SUBMIT.UPDATE , updateProjectAdminSchema, infoProjectAdmin)}
                >
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default ModalUpdateProjectAdmin;
