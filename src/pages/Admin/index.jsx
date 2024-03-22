import ModalDefault from "@/components/Modal";
import ModalDeleteDefault from "@/components/ModalDelete";
import MainLayout from "@/layouts/MainLayout"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Handle from "./handle";
import TableAdmin from "./components/TableAdmin";
import ModalCreateAdmin from "./components/CreateModalAdmin";
import ModalUpdateAdmin from "./components/UpdateModalAdmin";
import ModalChangePassAdmin from "./components/ModalChangePass";
import { handleDeleteAdmin } from "@/api/admin";
import { refreshRouteAdmin } from "@/states/modules/admin";

export default function Admins(){
    const dispatch = useDispatch();
    const visibleModalCreateAdmin = useSelector((state) => state.admin.visibleModalCreateAdmin)
    const visibleModalUpdateAdmin = useSelector((state) => state.admin.visibleModalUpdateAdmin);
    const visibleModalDeleteAdmin = useSelector((state) => state.admin.visibleModalDeleteAdmin);
    const visibleModalChangePass = useSelector((state) => state.admin.visibleModalChangePass);
    const isLoadingBtnDeleteAdmin = useSelector((state) => state.admin.isLoadingBtnDeleteAdmin);
    const infoAdmin = useSelector((state)=> state.admin.infoAdmin);

    const {
        handleCancelModalChangePass,
        handleCancelModalCreateAdmin,
        handleCancelModalDeleteAdmin,
        handleCancelModalUpdateAdmin,
    } = Handle();

    useEffect(()=>{
        return ()=> dispatch(refreshRouteAdmin())
    },[])

    return(
        // hasPermission(['super_admin']) ?
        <MainLayout>
                <div className={`px-8`}>
                    <div className={`relative main-select`}>
                        <TableAdmin/>
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
                        title='Update'
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
        </MainLayout>
        // :
        // <HeaderOnly>
        //     <Project/>
        // </HeaderOnly>
    )
}