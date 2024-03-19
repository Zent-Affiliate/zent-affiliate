import React, { useState } from "react";
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { setActiveClass } from "@/states/modules/admin";
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import InlineSVG from "react-inlinesvg";
import Handle from "../../handle";
const ClassItem = (props) => {
    const { record } = props;
    const dispatch = useDispatch();
    const me = useSelector(state => state.auth.me);
    const activeClass = useSelector(state => state.admin.activeClass);
    const [showIcons, setShowIcons] = useState(false);
    const handleToggleIcons = () => {
        setShowIcons(!showIcons);
    };
    const {
        handleShowModalCreateAdmin,
        handleCancelModalUpdateAdmin,
        handleCancelModalChangePass,
        handleCancelModalDeleteAdmin
        
    } = Handle()
    return (
        <div>
            <Tooltip placement="right" title={<div className="text-xs">
                <p>{record.name}</p>
                <div className={`flex w-full justify-center`}>
                        <div className="relative">
                            <button className="focus:outline-none" onClick={handleToggleIcons}>
                                M
                            </button>
                            {showIcons && (
                                <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-md p-2">
                                    <Tooltip title='Update information'>
                                        <div
                                            className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                                            onClick={() => handleCancelModalUpdateAdmin(record)}
                                        >
                                            <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt='' />
                                        </div>
                                    </Tooltip>

                                    {
                                        me._id !== record._id &&
                                        <Tooltip title='Delete information'>
                                            <div
                                                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                                                onClick={() => handleDeleteAdminAlert(record)}
                                            >
                                                <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt='' />
                                            </div>
                                        </Tooltip>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
            </div>}>
                <div
                    onClick={() => {
                        dispatch(setActiveClass(record));
                        console.log(record)
                        props.onClick()
                    }}
                    className={`${styles.itemWrap} ${activeClass && activeClass._id === record._id ? styles.activeItem : ''}`}
                >
                    <div className={`flex flex-col max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>
                        <>
                            <span className={'font-bold inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'}>{record.name}</span>
                            <span className={`${styles.name} inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>{record.email}</span>
                        </>
                    </div>
                    <span className="whitespace-nowrap ml-[6px]">{record?.projectCount} projects</span>
                </div>
            </Tooltip>
        </div>
    );
}

export default ClassItem;
