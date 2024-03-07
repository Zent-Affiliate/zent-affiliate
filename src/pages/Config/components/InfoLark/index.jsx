import { CONFIG_TYPE } from '@/utils/constains';
import Handle from '@/pages/Config/handle';
import InlineSVG from 'react-inlinesvg';
import { Input, Tooltip } from 'antd';
import { infoLarkSchema } from '../../schema';
import SaveIcon from "@/assets/images/icons/config/save.svg";
import LarkIcon from "@/assets/images/icons/config/lark.svg";
import IconWarning from "@/assets/images/icons/light/warning.svg";

function InfoLark() {
    const {
        infoLarks,
        errorConfig,
        handleChangeInputConfig,
        handleSubmitConfig,
        handleFocusConfig
    } = Handle()

    return (
        <div className={`bg-white rounded-lg border shadow-sm !h-[calc(100vh_-_200px)]`}>
            <div className={`flex px-6 py-4 border-b items-center`}>
                <div className="bg-[#dbeafe] p-2 rounded-md">
                    <InlineSVG src={LarkIcon} />
                </div>
                <p className={`text-[#9c9caa] font-semibold ml-4 text-base`}>
                    Thông tin LARK
                </p>
                <Tooltip title={'Lưu'}>
                    <div
                        className="ml-auto mt-1 p-2 hover:bg-[#eaeff8] hover:rounded-md hover:cursor-pointer"
                        onClick={() => handleSubmitConfig(CONFIG_TYPE.LARK_INFO, infoLarkSchema, infoLarks)}
                    >
                        <InlineSVG src={SaveIcon} />
                    </div>
                </Tooltip>
            </div>
            <div className={`input-wrap px-6 py-3`}>
                <div className='label-wrap'>
                    <label htmlFor="appId" className={`required`}>
                        APP ID
                    </label>
                </div>
                <Input
                    id='appId'
                    className={`main-input ${errorConfig && errorConfig?.app_id ? 'error-input' : ''}`}
                    placeholder={'Nhập APP ID'}
                    value={infoLarks?.app_id}
                    onFocus={() => handleFocusConfig('app_id', CONFIG_TYPE.LARK_INFO)}
                    onChange={(e) => handleChangeInputConfig(e.target.value, 'app_id', CONFIG_TYPE.LARK_INFO)}
                />
                {
                    errorConfig && errorConfig?.app_id &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorConfig?.app_id}
                    </span>
                }
            </div>
            <div className={`input-wrap px-6 py-2`}>
                <div className='label-wrap'>
                    <label htmlFor='appSecret' className={`required`}>
                        APP SECRET
                    </label>
                </div>
                <Input.Password
                    id='appSecret'
                    className={`main-input ${errorConfig && errorConfig?.app_secret ? 'error-input' : ''}`}
                    placeholder={'Nhập APP SECRET'}
                    value={infoLarks?.app_secret}
                    onFocus={() => handleFocusConfig('app_secret', CONFIG_TYPE.LARK_INFO)}
                    onChange={(e) => handleChangeInputConfig(e.target.value, 'app_secret', CONFIG_TYPE.LARK_INFO)}
                />
                {
                    errorConfig && errorConfig?.app_secret &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorConfig?.app_secret}
                    </span>
                }
            </div>
            <div className={`input-wrap px-6 py-2`}>
                <div className='label-wrap'>
                    <label htmlFor='groupId' className={`required`}>
                        GROUP ID
                    </label>
                </div>
                <Input
                    id='groupId'
                    className={`main-input ${errorConfig && errorConfig?.group_id ? 'error-input' : ''}`}
                    placeholder={'Nhập GROUP ID'}
                    value={infoLarks?.group_id}
                    onFocus={() => handleFocusConfig('group_id', CONFIG_TYPE.LARK_INFO)}
                    onChange={(e) => handleChangeInputConfig(e.target.value, 'group_id', CONFIG_TYPE.LARK_INFO)}
                />
                {
                    errorConfig && errorConfig?.group_id &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorConfig?.group_id}
                    </span>
                }
            </div>
            <div className={`input-wrap px-6 py-2`}>
                <div className='label-wrap'>
                    <label htmlFor='oauthUrl' className={`required`}>
                        OAUTH URL
                    </label>
                </div>
                <Input
                    id='oauthUrl'
                    className={`main-input ${errorConfig && errorConfig?.oauth_url ? 'error-input' : ''}`}
                    placeholder={'Nhập OAUTH URL'}
                    value={infoLarks?.oauth_url}
                    onFocus={() => handleFocusConfig('oauth_url', CONFIG_TYPE.LARK_INFO)}
                    onChange={(e) => handleChangeInputConfig(e.target.value, 'oauth_url', CONFIG_TYPE.LARK_INFO)}
                />
                {
                    errorConfig && errorConfig?.oauth_url &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorConfig?.oauth_url}
                    </span>
                }
            </div>
            <div className={`input-wrap px-6 py-2`}>
                <div className='label-wrap'>
                    <label htmlFor='messageUrl' className={`required`}>
                        MESSAGE URL
                    </label>
                </div>
                <Input
                    id='messageUrl'
                    className={`main-input ${errorConfig && errorConfig?.message_url ? 'error-input' : ''}`}
                    placeholder={'Nhập MESSAGE URL'}
                    value={infoLarks?.message_url}
                    onFocus={() => handleFocusConfig('message_url', CONFIG_TYPE.LARK_INFO)}
                    onChange={(e) => handleChangeInputConfig(e.target.value, 'message_url', CONFIG_TYPE.LARK_INFO)}
                />
                {
                    errorConfig && errorConfig?.message_url &&
                    <span className={`error`}>
                        <div className={`icon`}>
                            <InlineSVG src={IconWarning} width={14} height={14} />
                        </div>
                        {errorConfig?.message_url}
                    </span>
                }
            </div>
        </div>
    )
}

export default InfoLark
