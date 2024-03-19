import React, {useState} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveClass, setAdminSelected} from '@/states/modules/admin';
import Handle from '@/pages/Admin/components/TableAdmin/handle';
import Options from '@/pages/Rule/components/Options';

const ClassItem = (props) => {
    const {record} = props;
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
        handleCancelModalDeleteAdmin,
        handleShowModalUpdateAdmin,
        handleShowModalChangePassAdmin,
        handleDeleteAdminAlert
    } = Handle();
    return (
        <div>
            <div
                className={`${styles.itemWrap} ${activeClass && activeClass._id === record._id ? styles.activeItem : ''}`}
            >
                <div className={`flex flex-col max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>
                    <>
                        <span
                            className={'font-bold inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'}
                            onClick={() => {
                                dispatch(setActiveClass(record));
                                dispatch(setAdminSelected(record._id));
                                props.onClick();
                            }}
                        >
                            {record.name}
                        </span>
                        <span
                            className={`${styles.name} inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>{record.email}</span>
                        <span className='whitespace-nowrap ml-[0px]'>{record?.projectCount} projects</span>

                    </>
                </div>
                {/* <span className="whitespace-nowrap ml-[6px]">{record?.projectCount} projects</span> */}
                <Options
                    handleOnClickUpdate={() => handleShowModalUpdateAdmin(record)}
                    handleOnClickDelete={() => handleDeleteAdminAlert(record)}
                />
            </div>
        </div>
    );
};

export default ClassItem;
