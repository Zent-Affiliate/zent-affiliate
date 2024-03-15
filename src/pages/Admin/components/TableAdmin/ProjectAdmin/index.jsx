import MainLayout from "@/layouts/MainLayout";
import { Button, Input } from "antd";
import React from "react";
import Handle from "./handle";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "react-inlinesvg";
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import TableProjectAdmin from "./components/TableProjectAdmin";
import ModalDefault from "@/components/Modal";
import ModalCreateProjectAdmin from "./components/CreateModalProjectAdmin";
import ModalUpdateProjectAdmin from "./components/UpdateModalProjectAdmin";


export default function ProjectAdmin(){
    const dispatch = useDispatch();
    const visibleModalCreateProjectAdmin = useSelector((state)=> state.projectAdmin.visibleModalCreateProjectAdmin);
    const visibleModalUpdateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalUpdateProjectAdmin);
    const visibleModalDeleteProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalDeleteProjectAdmin);
    const isLoadingBtnDeleteProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnDeleteProjectAdmin);
    const dataFilter = useSelector((state) => state.projectAdmin.dataFilter);
    const infoProjectAdmin = useSelector((state)=> state.projectAdmin.infoProject);
    const {
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
        handleCancelModalDeleteProjectAdmin,
        handleSearchProjectAdmin,
        handleEnterSearchProjectAdmin,
        handleShowModalCreateProjectAdmin
    } = Handle()
    return(
        <MainLayout>
            <div className={`bg-white rounded-lg border shadow-sm`}>
                <div className={`py-8 px-8`}>
                    <div className={`flex justify-between mb-2.5`}>
                        <div className={`w-96`}>
                            <Input
                                value={dataFilter.keySearch}
                                onKeyDown={(e) => handleEnterSearchProjectAdmin}
                                onChange={(e) => handleSearchProjectAdmin(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Search by project name or code'
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
                    <div className={`relative main-select`}>
                        <TableProjectAdmin/>
                    </div>
                    <ModalDefault
                    isModalOpen={visibleModalCreateProjectAdmin}
                    handleCancel = {handleCancelModalCreateProjectAdmin}
                    title='Create new project'
                    >
                        <ModalCreateProjectAdmin/>
                    </ModalDefault>

                    <ModalDefault
                        isModalOpen={visibleModalUpdateProjectAdmin}
                        handleCancel={handleCancelModalUpdateProjectAdmin}
                        title="Update the project"
                    >
                        <ModalUpdateProjectAdmin/>
                    </ModalDefault>
                </div>
            </div>
        </MainLayout>
    )
}