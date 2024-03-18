import React from 'react';
import styles from './styles.module.scss';
import {setActiveUser} from '@/states/modules/commission';
import {useDispatch, useSelector} from 'react-redux';
import {Tooltip} from 'antd';

// eslint-disable-next-line react/display-name
const UserItem = (props) => {
  let {record, onClick = () => {}} = props;
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.commission.userActive);

  return (
    <Tooltip
      placement="right"
      title={
        <div className="text-xs">
          <p>Name: {record.name}</p>
          <p>Referral code: {record.referral_code}</p>
        </div>
      }
    >
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
      </div>
    </Tooltip>
  );
};

export default UserItem;
