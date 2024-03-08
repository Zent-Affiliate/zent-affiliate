import React from 'react';
import {Card} from 'antd';
import '../../styles.scss';
import styles from './styles.module.scss';

function CommissionItem({commission}) {
    const actionColors = ['danger', 'primary', 'warning', 'success'];


    return <Card className={'w-[250px] mr-5 cursor-pointer card-custom'}>
        <div className={'mb-3'}>
            <div className={'font-bold text-2xl'}>{commission.total} VND</div>
            <div className={'text-gray-500 font-semibold'}>từ {commission.referrer}</div>
        </div>
        <div className={styles.valueWrap}>
            {
                commission.values?.map((item, index) => (
                    <div key={index} className={'flex justify-between items-center'}>
                        <div className={'flex'}>
                            <div
                                className={`w-[8px] h-[5px] rounded-2 me-3 mt-2 rounded-3xl bg-${actionColors[index]}`}>&nbsp;</div>
                            <div className={'text-gray-500 flex-grow-1'}>{item.rule}</div>
                        </div>
                        <div className={'fw-bolder text-gray-700 text-xxl-end'}>{item.cost}₫</div>
                    </div>
                ))
            }
        </div>
    </Card>;
}

export default CommissionItem;