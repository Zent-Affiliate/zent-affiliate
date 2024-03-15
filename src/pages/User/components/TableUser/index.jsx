import TableDefault from '@/components/Table';
import React from 'react';
import Handle from './handle';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Tooltip} from 'antd';
import '../../styles.scss';
import {isRouteActive} from '@/utils/helper.js';

function TableUser() {
    // const dataListUsers = useSelector((state) => state.user.users);
    const isLoadingTableUser = useSelector((state) => state.user.isLoadingTableUser);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);
    const dataListUsers = useSelector(state=>state.user.users)

    const {
        handleChangeTableUser,
        handleChangePaginationUser,
        handleOpenCommission
    } = Handle();


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
                    <div className={`font-semibold`}>
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
            title: 'Referral code',
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
                    <i className={`text-black-subContent`}>updating</i>;
            }
        },
        {
            title: 'Amount',
            dataIndex: 'total',
            key: 'total',
            width: 200,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text) => {
                return <span>{text}</span>
            }
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 200,
            sorter: true,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text) => {
                return moment(text).format('DD-MM-YYYY');
            }
        },
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
                extraClassName={isRouteActive('/my-project-detail/:project_id/users') ? '' : 'table-user-custom'}
            />
        </div>
    );
}

export default TableUser;
