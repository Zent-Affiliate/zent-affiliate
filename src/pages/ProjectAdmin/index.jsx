import MainLayout from "@/layouts/MainLayout";
import { Button, Input } from "antd";
import React from "react";
import Handle from "./handle";
import { useSelector } from "react-redux";
import InlineSVG from "react-inlinesvg";
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import TableProjectAdmin from "./components/TableProjectAdmin";
import ModalDefault from "@/components/Modal";
import ModalCreateProjectAdmin from "./components/CreateModalProjectAdmin";
import ModalUpdateProjectAdmin from "./components/UpdateModalProjectAdmin";


export default function ProjectAdmin(){
    const visibleModalCreateProjectAdmin = useSelector((state)=> state.projectAdmin.visibleModalCreateProjectAdmin);
    const visibleModalUpdateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalUpdateProjectAdmin);
    const dataFilter = useSelector((state) => state.projectAdmin.dataFilter);
    const {
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
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
                                onKeyDown={() => handleEnterSearchProjectAdmin}
                                onChange={(e) => handleSearchProjectAdmin(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Tìm kiếm theo tên , mã code của dự án'
                            />
                        </div>
                        <div>
                            <Button className={`flex items-center ant-btn-primary h-full`}
                            onClick={handleShowModalCreateProjectAdmin}
                            >
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                    <div className={`relative main-select`}>
                        <TableProjectAdmin/>
                    </div>
                    <ModalDefault
                    isModalOpen={visibleModalCreateProjectAdmin}
                    handleCancel = {handleCancelModalCreateProjectAdmin}
                    title='Tạo mới dự án'
                    >
                        <ModalCreateProjectAdmin/>
                    </ModalDefault>

                    <ModalDefault
                        isModalOpen={visibleModalUpdateProjectAdmin}
                        handleCancel={handleCancelModalUpdateProjectAdmin}
                        title="Cập nhật dự án"
                    >
                        <ModalUpdateProjectAdmin/>
                    </ModalDefault>
                </div>
            </div>
        </MainLayout>
    )
}