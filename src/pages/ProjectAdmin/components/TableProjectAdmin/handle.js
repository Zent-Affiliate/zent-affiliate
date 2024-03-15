import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter, setErrorInfoProjectAdmin, setInfoProjectAdmin,  setVisibleModalDeleteProjectAdmin, setVisibleModalUpdateProjectAdmin } from '@/states/modules/projectAdmin';
import { deleteProjectAdmin, getListProjectAdmins } from '@/api/projectAdmin';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.projectAdmin.dataFilter);

    const handleShowModalUpdateProjectAdmin = (projectAdmin) => {
        dispatch(setInfoProjectAdmin({...projectAdmin}));
        dispatch(
            setErrorInfoProjectAdmin({
                _id:'',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalUpdateProjectAdmin(true));
    };

    const handleShowModalDeleteProjectAdmin = (projectAdmin) => {
        dispatch(
            setInfoProjectAdmin({
                _id: projectAdmin._id,
                name: projectAdmin.name,
                code: projectAdmin.code,
                admin_id: projectAdmin.admin_id,
                secret_key: projectAdmin.secret_key
            })
        );
        dispatch(setVisibleModalDeleteProjectAdmin(true));
    };

    const handleChangeTableProjectAdmin = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getListProjectAdmins());
    };

    const handleChangePaginationProjectAdmin = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(getListProjectAdmins());
    };

    const handleDeleteProjectAdminAlert = async (record) => {
        const result = await Swal.fire({
            title: `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Bạn có chắn chắn muốn xóa dự án <strong>${record.name}</strong> không?
      </p>`,
            icon: 'warning',
            showCancelButton: true,
            buttonsStyling: false,
            cancelButtonText: 'Đóng',
            confirmButtonText: 'Xóa',
            customClass: {
                popup: '!w-[416px] !h-[296px] !px-11 !important',
                confirmButton: 'hover:!bg-[#D81A48] p-2.5 px-7 rounded-lg !bg-[#F8285A] !text-white !font-semibold !outline-none mx-[5px] !mt-[-60px]',
                cancelButton: 'hover:!bg-blue-95 hover:!text-blue-55 p-2.5 px-6 rounded-lg !text-black-title !font-semibold !outline-none mx-[5px] !mt-[-60px]'
            }
        });
        if (result.isConfirmed) {
            dispatch(deleteProjectAdmin(record._id));
        }
    };

    return {
        handleShowModalUpdateProjectAdmin,
        handleShowModalDeleteProjectAdmin,
        handleChangeTableProjectAdmin,
        handleDeleteProjectAdminAlert,
        handleChangePaginationProjectAdmin
    };
}
