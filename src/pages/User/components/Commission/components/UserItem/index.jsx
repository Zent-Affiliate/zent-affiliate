import React from 'react';
import styles from './styles.module.scss';
import {setActiveUser} from '@/states/modules/commission';
import {useDispatch, useSelector} from 'react-redux';

// eslint-disable-next-line react/display-name
const UserItem = (props) => {
    let {
        record, onClick = () => {
        }
    } = props;
    const dispatch = useDispatch();
    const userActive = useSelector((state) => state.commission.userActive);

    return (
        <div
            onClick={() => {
                dispatch(setActiveUser(record));
                onClick();
            }}
            className={`${styles.itemWrap} ${
                userActive && userActive._id === record._id ? styles.activeItem : ''
            }`}
        >
            <div className={`flex flex-col max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>
                <>
                <span
                    className={
                        'font-bold inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'
                    }
                >
                 {record.name}
                </span>
                </>
            </div>
            <div className={`flex flex-col max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}>
                <>
                <span
                    className={
                        'text-[12px] font-semibold text-[#A6A6A6FF] max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'
                    }
                >
                 {record.referral_code}
                </span>
                </>
            </div>
        </div>
    );
};

export default UserItem;
