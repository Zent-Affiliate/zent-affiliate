import React, {useEffect, useRef} from 'react';
import InlineSVG from 'react-inlinesvg';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import IconChangePass from '@/assets/images/icons/duotone/lock.svg';
import {Button, Card, Col, Empty, Input, Row, Tooltip} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import ClassItem from '../ClassItem';
import './styles.module.scss';
import TableProjectAdmin from '@/pages/Admin/components/TableAdmin/ProjectAdmin/components/TableProjectAdmin/index';
import ModalCreateProjectAdmin from './ProjectAdmin/components/CreateModalProjectAdmin';
import ModalDefault from '@/components/Modal';
import ModalUpdateProjectAdmin from './ProjectAdmin/components/UpdateModalProjectAdmin';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import './styles.scss';

function TableAdmin() {
    const dataListAdmins = useSelector((state) => state.admin.admins);
    const isLoadingTableAdmin = useSelector((state) => state.admin.isLoadingTableAdmin);
    const me = useSelector((state) => state.auth.me);
    const paginationListAdmins = useSelector((state) => state.admin.paginationListAdmins);
    const activeClass = useSelector(state => state.admin.activeClass);
    const visibleModalCreateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalCreateProjectAdmin);
    const visibleModalUpdateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalUpdateProjectAdmin);
    const visibleModalDeleteProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalDeleteProjectAdmin);
    const isLoadingBtnDeleteProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnDeleteProjectAdmin);
    const infoProjectAdmin = useSelector((state) => state.projectAdmin.infoProject);
    const bodyRef = useRef();
    const cardRef = useRef();
    useEffect(() => {
        if (bodyRef?.current) {
            bodyRef.current?.parentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        dataListAdmins.forEach((item, index) => {
            if (cardRef?.current?.lastChild && item._id === activeClass._id) {
                cardRef.current.lastChild.scrollTo({
                    top: cardRef.current.lastChild?.children?.[index]?.offsetTop || 0,
                    behavior: 'smooth'
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeClass, isLoadingTableAdmin]);
    const {
        handleShowModalUpdateAdmin,
        handleShowModalChangePassAdmin,
        handleChangeTableAdmin,
        handleDeleteAdminAlert,
        handleChangePaginationAdmin,
        redirectProjectAdmins,
        handleClick,
        dataFilter,
        dataFilterProject,
        handleEnterSearchAdmin,
        handleSearchProjectAdmin,
        handleShowModalCreateProjectAdmin,
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
        handleCancelModalDeleteProjectAdmin,
        handleEnterSearchProjectAdmin,
        handleChangeSelectProjectAdmin,
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleShowModalCreateAdmin,
        handleCancelModalUpdateAdmin,
        handleCancelModalChangePass,
        handleCancelModalDeleteAdmin,
        handleSearchAdmin
    } = Handle();


    const columns = [
        {
            title: 'Fullname',
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
                            <div onClick={() => redirectProjectAdmins(record._id)}
                                 className={`mb-[4px] mt-[4px] text-black-content cursor-pointer`}>{text}</div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            title: 'Quantity',
            dataIndex: 'projectCount',
            key: 'projectCount',
            width: 250,
            sorter: (a, b) => a.age - b.age,
            showSorterTooltip: false,
            defaultSortOrder: '',
            render: (text, record) => {
                return (
                    <div className={`flex`}>
                        <div className={`ml-[10px] font-medium`}>
                            <div
                                className={`mb-[4px] mt-[4px] text-black-content`}>{text ? text + ' Project' : '0'}</div>
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
                            onClick={() => handleShowModalUpdateAdmin(record)}
                        >
                            <Tooltip title='Update '>
                                <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt='' />
                            </Tooltip>
                        </div>

                        <div
                            className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                            onClick={() => handleShowModalChangePassAdmin(record)}
                        >
                            <Tooltip title='Change password'>
                                <InlineSVG src={IconChangePass} className={`w-[16px] h-[16px]`} alt='' />
                            </Tooltip>
                        </div>

                        {
                            me._id !== record._id &&
                            <div
                                className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-60`}
                                onClick={() => handleDeleteAdminAlert(record)}
                            >
                                <Tooltip title='Delete'>
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
        <Row gutter={16}>
            <Col span={6}>
                <div className={'w-full h-[calc(100vh_-_250px)] bg-[#fcfcfc]'}>
                    <Card
                        loading={isLoadingTableAdmin}
                        onChange={handleChangeTableAdmin}
                        pagination={paginationListAdmins}
                        className={'admin-card-custom'}
                        title={<div>
                            {<div>
                                <div className={'mb-3.5 w-full '}>
                                    <div className={'flex items-center justify-around w-full mt-5'}>
                                        <div className={`w-[220px] mr-[10px]`}>
                                            <Input
                                                value={dataFilter.keySearch}
                                                onKeyDown={(e) => handleEnterSearchAdmin(e)}
                                                onChange={(e) => handleSearchAdmin(e.target.value)}
                                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`}
                                                                   alt='' />}
                                                className={`main-input`}
                                                placeholder='Search by name, email'
                                            />

                                        </div>
                                        <Button
                                            size={'large'}
                                            className={`flex items-center ant-btn-primary h-full`}
                                            onClick={handleShowModalCreateAdmin}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </div>}
                        </div>}
                    >
                        {dataListAdmins?.length === 0 ?
                            <div className={'flex justify-center items-center'}><Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE} /></div> :
                            dataListAdmins?.map(record => (
                                <ClassItem record={record} key={record._id} onClick={() => handleClick(record._id)} />
                            ))}
                    </Card>
                </div>
            </Col>
            <Col span={18}>
                <div className={`bg-white rounded-lg border shadow-sm`}>
                    <div className={`px-8 py-8`}>
                        <div className={`relative main-select`}>
                            <div className={`flex justify-between mb-2.5`}>
                                <div className={`w-96`}>
                                    <Input
                                        value={dataFilterProject.keySearch}
                                        onKeyDown={(e) => handleEnterSearchProjectAdmin(e)}
                                        onChange={(e) => handleSearchProjectAdmin(e.target.value)}
                                        prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                        className={`main-input`}
                                        placeholder='Search by name or code'
                                    />
                                </div>
                                <div>
                                    <Button className={`flex items-center ant-btn-primary h-full`}
                                            onClick={handleShowModalCreateProjectAdmin}
                                    >
                                        Create Project
                                    </Button>
                                </div>
                            </div>
                            <TableProjectAdmin />
                        </div>
                        <ModalDefault
                            isModalOpen={visibleModalCreateProjectAdmin}
                            handleCancel={handleCancelModalCreateProjectAdmin}
                            title='Create new project'
                        >
                            <ModalCreateProjectAdmin />
                        </ModalDefault>

                        <ModalDefault
                            isModalOpen={visibleModalUpdateProjectAdmin}
                            handleCancel={handleCancelModalUpdateProjectAdmin}
                            title='Update the project'
                        >
                            <ModalUpdateProjectAdmin />
                        </ModalDefault>

                    </div>

                </div>
            </Col>
        </Row>
    );
}

export default TableAdmin;
