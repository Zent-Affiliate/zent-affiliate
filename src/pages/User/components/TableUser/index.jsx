import TableDefault from '@/components/Table';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import IconChangePass from '@/assets/images/icons/duotone/lock.svg';
import {Avatar, Switch, Tooltip} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import avatarDefault from '@/assets/images/user/default-avatar-point.png';
import {ACTIVE_STATUS} from '@/utils/constains';

function TableUser() {
    const dataListUsers = useSelector((state) => state.user.users);
    const isLoadingTableUser = useSelector((state) => state.user.isLoadingTableUser);
    const me = useSelector((state) => state.auth.me);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);

    const {
        handleShowModalUpdateUser,
        handleShowModalChangePassUser,
        handleUpdateStatusUser,
        handleChangeTableUser,
        handleDeleteUserAlert,
        handleChangePaginationUser
    } = Handle();

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return (
                    <div className={`flex`}>
                        <Avatar
                            className={`shadow`}
                            crossOrigin='anonymous'
                            src={record.avatar ? record.avatar : avatarDefault}
                            size={52}
                        />
                        <div className={`ml-[10px] font-medium`}>
                            <div className={`mb-[4px] mt-[4px] text-black-content`}>{text}</div>
                            <span className={`text-black-content mr-1`}>Email:</span>
                            <a className='text-[13px] text-black-subContent hover:text-blue-55'
                               href={`mailto:${record.email}`}>
                                {record.email}
                            </a>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
            width: 200,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return record.phone ?
                    <a className={`text-black-subContent font-semibold hover:text-blue-55`}
                       href={`tel:${record.phone}`}>
                        {record.phone}
                    </a> :
                    <i className={`text-black-subContent`}>Đang cập nhật</i>;
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            defaultSortOrder: '',
            width: 120,
            render: (status, record) => {
                return me._id !== record._id &&
                    <Tooltip placement='top' title={status === ACTIVE_STATUS.LOCK ? 'Khoá' : 'Kích hoạt'}>
                        <Switch
                            className={`main-switch`}
                            onChange={() => handleUpdateStatusUser(record)}
                            checked={status}
                        />
                    </Tooltip>;
            }
        },
        {
            title: 'Hoạt động',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                return (
                    <div className={`flex w-full justify-center bg-white`}>
                        <div
                            className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                            onClick={() => handleShowModalUpdateUser(record)}
                        >
                            <Tooltip title='Cập nhật thông tin'>
                                <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt='' />
                            </Tooltip>
                        </div>

                        <div
                            className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                            onClick={() => handleShowModalChangePassUser(record)}
                        >
                            <Tooltip title='Đổi mật khẩu'>
                                <InlineSVG src={IconChangePass} className={`w-[16px] h-[16px]`} alt='' />
                            </Tooltip>
                        </div>

                        {
                            me._id !== record._id &&
                            <div
                                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                                onClick={() => handleDeleteUserAlert(record)}
                            >
                                <Tooltip title='Xóa thông tin'>
                                    <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt='' />
                                </Tooltip>
                            </div>
                        }
                    </div>
                );
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
