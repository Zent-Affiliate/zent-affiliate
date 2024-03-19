import TableDefault from '@/components/Table';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import { Tooltip} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import HiddenString from '@/components/HiddenString';

function TableProjectAdmin() {
    const dataListProjectAdmins = useSelector((state) => state.projectAdmin.projectAdmins);
    const isLoadingTableProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingTableProjectAdmin);
    const me = useSelector((state) => state.auth.me);
    const paginationListProjectAdmin = useSelector((state) => state.projectAdmin.paginationListProjectAdmin);

    const {
        handleShowModalUpdateProjectAdmin,
        handleChangeTableProjectAdmin,
        handleDeleteProjectAdminAlert,
        handleChangePaginationProjectAdmin,
        redirectToProject,
    } = Handle();

    const columns = [
        {
            title: 'Code of Project',
            dataIndex: 'code',
            key: 'code',
            width: 250,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return (
                    <div className={`flex`}>
                        <div className={`ml-[10px] font-medium`}>
                            <div className={`mb-[4px] mt-[4px] text-black-content cursor-pointer`} onClick={()=>redirectToProject(record._id)}>{text}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Name Project',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text) => {
                return (
                    <div className={`flex`}>
                        <div className={`ml-[10px] font-medium`}>
                            <div className={`mb-[4px] mt-[4px] text-black-content`}>{text}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Secret Key',
            dataIndex: 'secret_key',
            key: 'secret_key',
            width: 250,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text) => {
                return (
                    <div className={`flex`}>
                         <div className={`font-medium w-full`}>
              <HiddenString
                value={text}
              />
            </div>
                    </div>
                );
            }
        },
        {
            title: 'Activities',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                return (
                    <div className={`flex w-full justify-center bg-white`}>
                        <Tooltip title='Update information'>
                            <div
                                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                                onClick={() => handleShowModalUpdateProjectAdmin(record)}
                            >
                                    <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt='' />
                            </div>
                        </Tooltip>

                        {
                            me._id !== record._id &&
                            <Tooltip title='Delete information'>
                                <div
                                    className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                                    onClick={() => handleDeleteProjectAdminAlert(record)}
                                >
                                        <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt='' />
                                </div>
                            </Tooltip>
                        }
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            <TableDefault
                loading={isLoadingTableProjectAdmin}
                onChange={handleChangeTableProjectAdmin}
                dataSource={dataListProjectAdmins}
                isPagination={false}
                columns={columns}
                rowKey={(record) => record._id}
            />
        </div>
    );
}

export default TableProjectAdmin;
