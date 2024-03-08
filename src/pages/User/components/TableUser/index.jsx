import TableDefault from '@/components/Table';
import React from 'react';
import Handle from './handle';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Tooltip} from 'antd';

function TableUser() {
    // const dataListUsers = useSelector((state) => state.user.users);
    const isLoadingTableUser = useSelector((state) => state.user.isLoadingTableUser);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);

    const {
        handleChangeTableUser,
        handleChangePaginationUser,
        handleOpenCommission
    } = Handle();

    const dataListUsers = [
        {
            _id: '12312',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MGT012',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '55',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MGT012',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '44',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MGT013',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '33',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MSAD012',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '22',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'ADA012',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '11',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MADT032',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '11',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MADT032',
            referrer_id: '111',
            created_at: 1709868545
        },
        {
            _id: '11',
            name: 'Nguyen Minh Tuan',
            project_user_id: '11',
            project_id: '1',
            referral_code: 'MADT032',
            referrer_id: '111',
            created_at: 1709868545
        }
    ];

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: true,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return (
                    <div className={`ml-[10px] font-semibold`}>
                        <div
                            className={`mb-[4px] mt-[4px] text-black-content`}>
                            <Tooltip title={'Nhấn để xem lịch sử giao dịch'}><span
                                className={'cursor-pointer hover:text-blue-55'}
                                onClick={() => handleOpenCommission(record._id)}>{text}</span></Tooltip>
                        </div>
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

    return (
        <div>
            <TableDefault
                loading={isLoadingTableUser}
                onChange={handleChangeTableUser}
                dataSource={dataListUsers}
                pagination={paginationListUsers}
                columns={columns}
                rowKey={(record) => record._id}
                handleSelectPagination={(e) => handleChangePaginationUser(e)}
            />
        </div>
    );
}

export default TableUser;
