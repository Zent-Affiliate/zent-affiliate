import TableDefault from '@/components/Table';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import IconChangePass from '@/assets/images/icons/duotone/lock.svg';
import {Avatar, Switch, Tooltip} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import {ACTIVE_STATUS} from '@/utils/constants';

function TableProject() {
    const dataListProjects = useSelector((state) => state.project.projects);
    const isLoadingTableProject = useSelector((state) => state.project.isLoadingTableProject);
    const me = useSelector((state) => state.auth.me);
    const paginationListProjects = useSelector((state) => state.project.paginationListProjects);

    const {
        handleShowModalUpdateProject,
        handleChangeTableProject,
        handleDeleteProjectAlert,
        handleChangePaginationProject,
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
            render: (text, record) => {
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
            render: (text, record) => {
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
                            onClick={() => handleShowModalUpdateProject(record)}
                        >
                            <Tooltip title='Cập nhật thông tin'>
                                <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt='' />
                            </Tooltip>
                        </div>

                        {
                            me._id !== record._id &&
                            <div
                                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                                onClick={() => handleDeleteProjectAlert(record)}
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
                loading={isLoadingTableProject}
                onChange={handleChangeTableProject}
                dataSource={dataListProjects}
                pagination={paginationListProjects}
                columns={columns}
                rowKey={(record) => record._id}
                handleSelectPagination={(e) => handleChangePaginationProject(e)}
            />
        </div>
    );
}

export default TableProject;
