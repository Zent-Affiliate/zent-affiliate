import ModalDefault from "@/components/Modal"
import TableDefault from "@/components/Table"
import MainLayout from "@/layouts/MainLayout"
import { Button, Dropdown, Input, Space } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import InlineSVG from "react-inlinesvg"
import Handle from "./handle"
import TableProject from "./components/TableProject"
import ModalCreateProject from "./components/CreateModalProject"
import ModalUpdateProject from "./components/UpdateModalProject"
import ModalDeleteDefault from "@/components/ModalDelete"
import { handleDeleteProject } from "@/api/project"
import { hasPermission } from "@/utils/helper"
import HeaderOnly from "@/layouts/HeaderOnly"


export default function Project() {
    const dispatch = useDispatch();
    const visitableModelCreateProject = useSelector((state) => state.project.visibleModalCreateProject);
    const visibleModalUpdateProject = useSelector((state) => state.project.visibleModalUpdateProject);
    const visibleModalDeleteProject = useSelector((state) => state.project.visibleModalDeleteProject);
    const isLoadingBtnDeleteProject = useSelector((state) => state.project.isLoadingBtnDeleteProject);
    const dataFilter = useSelector((state) => state.project.dataFilter);
    const infoProject = useSelector((state)=> state.project.infoProject);
    const {
        handleCancelModalCreateProject,
        handleCancelModalDeleteProject,
        handleCancelModalUpdateProject,
        handleSearchProject,
        handleEnterSearchProject,
        handleChangeSelectProject,
        handleShowModalCreateProject
    } = Handle()
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];
    return (
        hasPermission(['super_admin']) ?
        <MainLayout>
            <div className={`bg-white rounded-lg border shadow-sm`}>
                <div className={`py-8 px-8`}>
                    <div className={`flex justify-between mb-2.5`}>
                        <div className={`w-96`}>
                            <Input 
                                value={dataFilter.keySearch}
                                onKeyDown={(e) => handleEnterSearchProject}
                                onChange={(e) => handleSearchProject(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Search by project name or code'
                            />
                        </div>
                        <div>
                            <Button 
                            className={`flex items-center ant-btn-primary h-full`}
                            onClick={handleShowModalCreateProject}
                            >
                                Create  
                            </Button>
                        </div>
                    </div>
                    <div className={`relative main-select`}>
                        <TableProject/>
                    </div>
                    <ModalDefault
                        isModalOpen={visitableModelCreateProject}
                        handleCancel = {handleCancelModalCreateProject}
                        title='Create new project'
                    >
                        <ModalCreateProject/>
                    </ModalDefault>

                    <ModalDefault
                         isModalOpen={visibleModalUpdateProject}
                         handleCancel = {handleCancelModalUpdateProject}
                         title='Update the project'
                    >
                        <ModalUpdateProject/>
                    </ModalDefault>

                    <ModalDeleteDefault
                        loading={isLoadingBtnDeleteProject}
                        isModalOpen={visibleModalDeleteProject}
                        handleCancel={handleCancelModalDeleteProject}
                        handleConfirm={() => dispatch(handleDeleteProject(infoProject._id))}
                        contentBtn='Delete'
                    >
                    </ModalDeleteDefault>
                </div>
            </div>
        </MainLayout>
        :
        <HeaderOnly>
            <div className={`bg-white rounded-lg border shadow-sm`}>
                <div className={`py-8 px-8`}>
                    <div className={`flex justify-between mb-2.5`}>
                        <div className={`w-96`}>
                            <Input 
                                value={dataFilter.keySearch}
                                onKeyDown={(e) => handleEnterSearchProject}
                                onChange={(e) => handleSearchProject(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Search for name or code of project'
                            />
                        </div>
                        <div>
                            <Space direction="vertical" >
                            <Dropdown
                                menu={{
                                    items
                                }}
                                placement="bottom"
                                
                            >
                                <Button type="primary">Project</Button>
                            </Dropdown>
                            </Space>
                        </div>
                        <div>
                            <Button 
                            className={`flex items-center ant-btn-primary h-full`}
                            onClick={handleShowModalCreateProject}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                    <div className={`relative main-select`}>
                        <TableProject/>
                    </div>
                    <ModalDefault
                        isModalOpen={visitableModelCreateProject}
                        handleCancel = {handleCancelModalCreateProject}
                        title='Create new project'
                    >
                        <ModalCreateProject/>
                    </ModalDefault>

                    <ModalDefault
                         isModalOpen={visibleModalUpdateProject}
                         handleCancel = {handleCancelModalUpdateProject}
                         title='Update the project'
                    >
                        <ModalUpdateProject/>
                    </ModalDefault>

                    <ModalDeleteDefault
                        loading={isLoadingBtnDeleteProject}
                        isModalOpen={visibleModalDeleteProject}
                        handleCancel={handleCancelModalDeleteProject}
                        handleConfirm={() => dispatch(handleDeleteProject(infoProject._id))}
                        contentBtn='Delete'
                    >
                    </ModalDeleteDefault>
                </div>
            </div>
        </HeaderOnly>
    )
}