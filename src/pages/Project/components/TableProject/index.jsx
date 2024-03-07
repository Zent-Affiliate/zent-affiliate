import TableDefault from '@/components/Table';
import React from 'react'
import InlineSVG from 'react-inlinesvg';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg'
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg'
import {Tooltip} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import {PROJECT_STATUS} from '@/utils/constains';

function TableProject() {
  const dataListProject = useSelector(state => state.project.projects)
  const isLoadingTableProject = useSelector(state => state.project.isLoadingTableProject)
  const authUser = useSelector(state => state.auth.authUser)
  const paginationListProjects = useSelector(
    (state) => state.project.paginationListProjects
  );
  
  const {
    handleChangeTableProject,
    handleChangePaginationProject,
    handleShowModalUpdateProject,
    handleDeleteProjectAlert
  } = Handle()
  
  const columns = [
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (
          <div className={`flex`}>
            <div className={`ml-[2px] w-11/12`}>
              <div
                title={text}
                className={`whitespace-nowrap overflow-hidden break-words text-ellipsis font-semibold mb-[2px] text-black-content`}>{text}</div>
              <div className={''}>
                {
                  record.tags.length > 0 ?
                    record.tags.map((item, index) =>
                      <span
                        className={`border-[1px] border-[#17c653] text-[#17c653] inl text-[11px] rounded-[3px] px-[2px] py-[0px] mr-[6px] mt-1 whitespace-nowrap inline-block`}
                        key={index}
                      >
                        {item.name}
                      </span>
                    ) :
                    <span className={`text-[#909399] italic text-[11px]`}>
                      Đang cập nhật
                    </span>
                }
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Link dự án',
      dataIndex: 'domain',
      key: 'domain',
      width: 200,
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (record?.domain ?
            <div
             title={record?.domain}
             className='whitespace-nowrap overflow-hidden overflow-ellipsis break-words text-blue-55'
            >
              <a href={record?.domain} target='_blank' rel="noreferrer">{record?.domain}</a>
            </div> :
              <a className={`text-[#909399] text-center hover:text-blue-55`}>Đang cập nhật</a>
        )
      }
    },
    {
      title: 'Tên máy chủ',
      dataIndex: 'server',
      key: 'server',
      align: 'center',
      width: 200,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text, record) => {
        return (record?.server.name ?
          <p title={record?.server.name}
            className='text-start whitespace-nowrap overflow-hidden overflow-ellipsis break-words'
          >
            {record?.server.name}
          </p> :
          <i className={`text-[#909399]`}>Đang cập nhật</i>
        )
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (status) => {
        return (
          status === PROJECT_STATUS.STOPPING ?
            <div className="bg-[#FFEEF3] w-2/3 mx-auto  text-[#F8285A] rounded-[0.425rem] text-[11px] font-bold">Đã dừng</div> :
            <div className="bg-[#DFFFEA] w-2/3 mx-auto text-[#17C653] rounded-[0.425rem] text-[11px] font-bold">Hoạt động</div>
        )
      },
      defaultSortOrder: '',
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
              className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
              onClick={() => handleShowModalUpdateProject(record)}
            >
              <Tooltip title="Cập nhật thông tin">
                <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px]`} alt=""/>
              </Tooltip>
            </div>
            {
              authUser._id !== record._id &&
              <div
                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                onClick={() => handleDeleteProjectAlert(record)}
              >
                <Tooltip title="Xóa dự án">
                  <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt=""/>
                </Tooltip>
              </div>
            }
          </div>
        )
      }
    },
  ];
  
  return (
    <TableDefault
      loading={isLoadingTableProject}
      onChange={handleChangeTableProject}
      dataSource={dataListProject}
      pagination={paginationListProjects}
      columns={columns}
      rowKey={(record) => record._id}
      handleSelectPagination={e => handleChangePaginationProject(e)}
    />
  )
}

export default TableProject;

