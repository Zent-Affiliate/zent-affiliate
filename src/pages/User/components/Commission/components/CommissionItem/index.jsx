import React, {useEffect} from 'react';
import {Card, Tooltip} from 'antd';
import '../../styles.scss';
import styles from './styles.module.scss';
import Handle from '@/pages/User/components/Commission//components/CommissionItem/handle.js';

function CommissionItem({commission}) {
  const {
    commissions,
    activeCommission,
    userActive,

    handleActiveCommission,
  } = Handle();

  const actionColors = ['danger', 'primary', 'warning', 'success'];

  useEffect(() => {
    if (commissions?.[0] && userActive) {
      handleActiveCommission(commissions[0]);
    }
  }, [userActive]);

  return (
    <Card
      className={`min-w-[230px] mr-5 cursor-pointer ${
        activeCommission?._id === commission?._id ? 'active-card' : 'non-active-card'
      }`}
      onClick={() => handleActiveCommission(commission)}
    >
      <div className={'mb-3'}>
        <Tooltip title={commission.total.toLocaleString()}>
          <div className={'font-bold text-2xl max-w-full overflow-hidden text-ellipsis whitespace-nowrap'}>
            {commission.total.toLocaleString()}
          </div>
        </Tooltip>
      </div>
      <div className={styles.valueWrap}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex'}>
            <div className={`w-[8px] h-[5px] rounded-2 me-3 mt-2 rounded-3xl bg-${actionColors[1]}`}>
              &nbsp;
            </div>
            <div className={'text-gray-500 flex-grow-1'}>{commission.rule_name}</div>
          </div>
        </div>
      </div>

      <div className={styles.valueWrap}>
        <div className={'flex justify-between items-center'}>
          <div className={'flex'}>
            <div className={`w-[8px] h-[5px] rounded-2 me-3 mt-2 rounded-3xl bg-${actionColors[2]}`}>
              &nbsp;
            </div>
            <div className={'text-gray-500 flex-grow-1'}>{commission.rule_code}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CommissionItem;
