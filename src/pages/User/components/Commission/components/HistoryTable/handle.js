import React from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';

export default function Handle() {
    const paginationListHistories = useSelector(state => state.commission.paginationListHistories);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: true,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return (
                    <div className={`ml-[10px] font-semibold`}>

                    </div>
                );
            }
        },
        {
            title: 'Mã giới thiệu',
            dataIndex: 'referral_code',
            key: 'referral_code',
            width: 200,
            sorter: true,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return record.referral_code ?
                    <div className={`text-black-subContent`}>
                        {record.referral_code}
                    </div> :
                    <i className={`text-black-subContent`}>Chưa có</i>;
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
            sorter: true,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text) => {
                return moment.unix(text).format('DD-MM-YYYY');
            }
        }
    ];

    return {
        paginationListHistories,
        columns
    };
}