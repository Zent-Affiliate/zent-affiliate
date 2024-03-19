import ModalDefault from "@/components/Modal";
import ModalDeleteDefault from "@/components/ModalDelete";
import MainLayout from "@/layouts/MainLayout"
import { Button, Input, Select, Table } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Handle from "./handle";
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import InlineSVG from "react-inlinesvg";
import TableAdmin from "./components/TableAdmin";
import ModalCreateAdmin from "./components/CreateModalAdmin";
import ModalUpdateAdmin from "./components/UpdateModalAdmin";
import ModalChangePassAdmin from "./components/ModalChangePass";
import { handleDeleteAdmin } from "@/api/admin";
import HeaderOnly from "@/layouts/HeaderOnly";
import { hasPermission } from "@/utils/helper";
import { refreshRouteAdmin } from "@/states/modules/admin";

export default function Admins(){
    const dispatch = useDispatch();
    const visibleModalCreateAdmin = useSelector((state) => state.admin.visibleModalCreateAdmin)
    const visibleModalUpdateAdmin = useSelector((state) => state.admin.visibleModalUpdateAdmin);
    const visibleModalDeleteAdmin = useSelector((state) => state.admin.visibleModalDeleteAdmin);
    const visibleModalChangePass = useSelector((state) => state.admin.visibleModalChangePass);
    const isLoadingBtnDeleteAdmin = useSelector((state) => state.admin.isLoadingBtnDeleteAdmin);
    const dataFilter = useSelector((state) => state.admin.dataFilter);
    const infoAdmin = useSelector((state)=> state.admin.infoAdmin);
    const paginationListAdmins = useSelector((state) => state.admin.paginationListAdmins)
    const selectLimit = [20, 50, 100];

    const {
        handleCancelModalChangePass,
        handleCancelModalCreateAdmin,
        handleCancelModalDeleteAdmin,
        handleCancelModalUpdateAdmin,
        handleSearchAdmin,
        handleEnterSearchAdmin,
        handleShowModalCreateAdmin,
    } = Handle();

    useEffect(()=>{
        return ()=> dispatch(refreshRouteAdmin())
    },[])

    return(
        // hasPermission(['super_admin']) ?
        <MainLayout>
            <div className={`bg-white rounded-lg border shadow-sm`}>
                <div className={`py-8 px-8`}>
                    <div className={`flex justify-between mb-2.5`}>
                        <div className={`w-96`}>
                            <Input
                                value={dataFilter.keySearch}
                                onKeyDown={(e) => handleEnterSearchAdmin(e)}
                                onChange={(e) => handleSearchAdmin(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Search by admin name or email'
                            />
                        </div>

                        <div>
                            {/* <Button 
                            className={`flex items-center ant-btn-primary h-full`}
                            onClick={handleShowModalCreateAdmin}
                            >
                                Create
                            </Button> */}
                        </div>
                    </div>

                    <div className={`relative main-select`}>
                        <TableAdmin/>
                        {/* <Select
                            className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
                            value={paginationListAdmins.perPage}
                            onChange={(e) => handleChangeSelectAdmin(e)}
                        /> */}
                    </div>

                    <ModalDefault
                        isModalOpen={visibleModalCreateAdmin}
                        handleCancel = {handleCancelModalCreateAdmin}
                        title='Create new admin'
                    >
                        <ModalCreateAdmin/>
                    </ModalDefault>

                    <ModalDefault
                        isModalOpen={visibleModalUpdateAdmin}
                        handleCancel = {handleCancelModalUpdateAdmin}
                        title='Update information'
                    >
                        <ModalUpdateAdmin/>
                    </ModalDefault>

                    <ModalDefault 
                        isModalOpen={visibleModalChangePass}
                        handleCancel = {handleCancelModalChangePass}
                        title='Change new password'
                        >
                        <ModalChangePassAdmin/>
                    </ModalDefault>

                    <ModalDeleteDefault
                        loading={isLoadingBtnDeleteAdmin}
                        isModalOpen={visibleModalDeleteAdmin}
                        handleCancel={handleCancelModalDeleteAdmin}
                        handleConfirm={() => dispatch(handleDeleteAdmin(infoAdmin._id))}
                        contentBtn='Delete'
                    >
                    </ModalDeleteDefault>
                </div>
            </div>
        </MainLayout>
        // :
        // <HeaderOnly>
        //     <Project/>
        // </HeaderOnly>
    )
}