import React, {useEffect, useRef} from 'react';
import InlineSVG from 'react-inlinesvg';
import {Button, Card, Col, Empty, Input, Row} from 'antd';
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
import { PlusOutlined } from '@ant-design/icons';

function TableAdmin() {
    const dataListAdmins = useSelector((state) => state.admin.admins);
    const isLoadingTableAdmin = useSelector((state) => state.admin.isLoadingTableAdmin);
    const paginationListAdmins = useSelector((state) => state.admin.paginationListAdmins);
    const activeClass = useSelector(state => state.admin.activeClass);
    const visibleModalCreateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalCreateProjectAdmin);
    const visibleModalUpdateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalUpdateProjectAdmin);
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
        handleChangeTableAdmin,
        handleClick,
        dataFilter,
        dataFilterProject,
        handleEnterSearchAdmin,
        handleSearchProjectAdmin,
        handleShowModalCreateProjectAdmin,
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
        handleEnterSearchProjectAdmin,
        handleShowModalCreateAdmin,
        handleSearchAdmin
    } = Handle();

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
                                            className={`flex items-center justify-center ant-btn-primary h-full`}
                                            onClick={handleShowModalCreateAdmin}
                                            icon={<PlusOutlined />}
                                        >
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
                    <div className={`p-[24px]`}>
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
                                        Create
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
                            title='Update project'
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
