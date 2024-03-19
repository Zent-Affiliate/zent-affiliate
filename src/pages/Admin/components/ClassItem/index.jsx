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
            </div>}>
                <div
                    onClick={() => {
                        dispatch(setActiveClass(record))
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
