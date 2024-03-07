import { CONFIG_TYPE, TIME_TYPE } from '@/utils/constains';
import Handle from '@/pages/Config/handle';
import InlineSVG from 'react-inlinesvg';
import { notificationSchema } from '../../schema';
import { Col, Input, Row, Select, Slider, Switch, Tooltip } from 'antd';
import TimeIcon from "@/assets/images/icons/config/time.svg";
import ServerIcon from "@/assets/images/icons/config/server.svg";
import ProjectIcon from "@/assets/images/icons/config/project.svg";
import LayerIcon from "@/assets/images/icons/config/layer.svg";
import LineIcon from "@/assets/images/icons/config/line.svg";
import SaveIcon from "@/assets/images/icons/config/save.svg";
import BellsIcon from "@/assets/images/icons/config/bells.svg";
import BellIcon from "@/assets/images/icons/config/bell.svg";
import IconWarning from "@/assets/images/icons/light/warning.svg";

function Notification() {
    const {
        notifications,
        errorNotification,
        handleSwitchChangeConfig,
        handleSubmitConfig,
        handleChangePercentConfig,
        handleChangeInputConfig,
        handleFocusConfig,
        handleChangeType
    } = Handle()

    return (
        <div className={`bg-white rounded-lg border shadow-sm !h-[calc(100vh_-_200px)]`}>
            <div className={`flex px-6 py-4 border-b items-center`}>
                <div className={`bg-[#dbeafe] p-2 rounded-md`}>
                    <InlineSVG src={BellsIcon} />
                </div>
                <p className={`text-[#9c9caa] font-semibold ml-4 text-base`}>
                    Thông báo
                </p>
                <Tooltip title={'Lưu'}>
                    <div
                        className={`ml-auto mt-1 p-2 hover:bg-[#eaeff8] hover:rounded-md hover:cursor-pointer`}
                        onClick={() => handleSubmitConfig(CONFIG_TYPE.NOTIFICATION, notificationSchema, notifications)}
                    >
                        <InlineSVG src={SaveIcon} />
                    </div>
                </Tooltip>
            </div>
            <Row className={`py-3`}>
                <Col span={14}>
                    <div className={`border-r border-dotted`}>
                        <div className={`input-wrap px-6 flex items-center !mb-[10px]`}>
                            <div className={`bg-[#f9f9f9] p-2 rounded-lg`}>
                                <InlineSVG src={TimeIcon} />
                            </div>
                            <p className={`ml-2 mt-1 label-wrap w-[190px]`}>
                                Thời gian chờ sau mỗi lần thông báo
                            </p>
                            <div className={`ml-auto`}>
                                <Input
                                    className={`w-[140px]`}
                                    min={1}
                                    addonAfter={
                                        <Select
                                            value={notifications?.notification_time_type}
                                            className={`w-[80px]`}
                                            onChange={(value) => handleChangeType(value)}
                                        >
                                            <Select.Option value={TIME_TYPE.DAY}>Ngày</Select.Option>
                                            <Select.Option value={TIME_TYPE.HOUR}>Giờ</Select.Option>
                                            <Select.Option value={TIME_TYPE.MINUTE}>Phút</Select.Option>
                                        </Select>
                                    }
                                    value={notifications?.notification_time}
                                    onFocus={() => handleFocusConfig('notification_time', CONFIG_TYPE.NOTIFICATION)}
                                    onChange={(e) => handleChangeInputConfig(e.target.value, 'notification_time', CONFIG_TYPE.NOTIFICATION)}
                                />
                            </div>
                        </div>
                        {
                            errorNotification && errorNotification?.notification_time &&
                            <div className={`input-wrap pl-[70px] pr-6 !mt-[-12px]`}>
                                <span className={`error`}>
                                    <div className={`icon`}>
                                        <InlineSVG src={IconWarning} width={14} height={14} />
                                    </div>
                                    {errorNotification?.notification_time}
                                </span>
                            </div>
                        }
                        <div className={`border-b border-dotted mx-6`}></div>
                        <div className={`input-wrap px-6 flex items-center my-4`}>
                            <div className={`bg-[#f9f9f9] p-2 rounded-lg`}>
                                <InlineSVG src={ServerIcon} />
                            </div>
                            <p className={`ml-2 mt-1 label-wrap`}>
                                Thông báo máy chủ dừng hoạt động
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_server}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_server')}
                                />
                            </div>
                        </div>
                        <div className={`border-b border-dotted mx-6`}></div>
                        <div className="input-wrap px-6 flex items-center my-4">
                            <div className={`bg-[#f9f9f9] p-2 rounded-lg`}>
                                <InlineSVG src={ProjectIcon} />
                            </div>
                            <p className={`ml-2 mt-1 label-wrap`}>
                                Thông báo dự án dừng hoạt động
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_project}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_project')}
                                />
                            </div>
                        </div>
                        <div className={`border-b border-dotted mx-6`}></div>
                        <div className={`input-wrap px-6 flex items-center my-4`}>
                            <div className={`bg-[#f9f9f9] p-2 rounded-lg`}>
                                <InlineSVG src={LayerIcon} />
                            </div>
                            <p className={`ml-2 mt-1 label-wrap w-[250px]`}>
                                Thông báo service/docker container dừng hoạt động
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_service}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_service')}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className={`input-wrap px-6 flex items-center py-2`}>
                        <div className={`bg-[#f9f9f9] p-2 rounded-lg`}>
                            <InlineSVG src={BellIcon} />
                        </div>
                        <p className={`ml-2 mt-1 label-wrap`}>
                            Thông báo máy chủ quá tải
                        </p>
                    </div>
                    <div className={`input-wrap pl-11 pr-6 items-center`}>
                        <div className={`flex rounded-lg pb-4`}>
                            <InlineSVG src={LineIcon} />
                            <p className={`label-wrap`}>
                                CPU quá tải
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_cpu}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_cpu')}
                                />
                            </div>
                        </div>
                        <div className={`input-wrap pl-5 ${notifications?.notification_cpu ? '' : 'hidden'}`}>
                            <p className={`label-wrap`}>
                                Mức sử dụng CPU({notifications?.warning_cpu}%)
                            </p>
                            <Slider
                                value={notifications?.warning_cpu}
                                onChange={(percent) => handleChangePercentConfig(percent, 'warning_cpu')}
                            />
                        </div>
                        <div className={`flex rounded-lg py-4`}>
                            <InlineSVG src={LineIcon} />
                            <p className={`label-wrap`}>
                                RAM quá tải
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_ram}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_ram')}
                                />
                            </div>
                        </div>
                        <div className={`input-wrap pl-5 ${notifications?.notification_ram ? '' : 'hidden'}`}>
                            <p className={`label-wrap`}>
                                Mức sử dụng RAM({notifications?.warning_ram}%)
                            </p>
                            <Slider
                                value={notifications?.warning_ram}
                                onChange={(percent) => handleChangePercentConfig(percent, 'warning_ram')}
                            />
                        </div>
                        <div className={`flex rounded-lg py-4`}>
                            <InlineSVG src={LineIcon} />
                            <p className={`label-wrap`}>
                                Ổ cứng quá tải
                            </p>
                            <div className={`ml-auto`}>
                                <Switch
                                    className={`main-switch`}
                                    checked={notifications?.notification_disk}
                                    onChange={(checked) => handleSwitchChangeConfig(checked, 'notification_disk')}
                                />
                            </div>
                        </div>
                        <div className={`input-wrap pl-5 ${notifications?.notification_disk ? '' : 'hidden'}`}>
                            <p className={`label-wrap`}>
                                Mức sử dụng ổ cứng({notifications?.warning_disk}%)
                            </p>
                            <Slider
                                value={notifications?.warning_disk}
                                onChange={(percent) => handleChangePercentConfig(percent, 'warning_disk')}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Notification
