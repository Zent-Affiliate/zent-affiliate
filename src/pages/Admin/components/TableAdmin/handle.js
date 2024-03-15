import {ACTIVE_STATUS} from '@/utils/constains';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import { setDataChangePassAdmin, setDataFilter, setErrorDataChangePassAdmin, setErrorInfoAdmin, 
    setInfoAdmin, setVisibleModalChangePass, setVisibleModalDeleteAdmin,
    setVisibleModalUpdateAdmin
} from '@/states/modules/admin';
import { getListAdmins, handleDeleteAdmin } from '@/api/admin';
import { useNavigate } from 'react-router-dom';

export default function Handle() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const dataFilter = useSelector((state) => state.admin.dataFilter);

    const handleShowModalUpdateAdmin = (admin) => {
        dispatch(setInfoAdmin({...admin}));
        dispatch(
            setErrorInfoAdmin({
                name: '',
                email: '',
                password: ''
            })
        );
        dispatch(setVisibleModalUpdateAdmin(true));
    };

    const handleShowModalChangePassAdmin = (admin) => {
        dispatch(setErrorDataChangePassAdmin({_id: admin._id}));
        dispatch(setVisibleModalChangePass(true));
    };

    const handleShowModalDeleteAdmin = (admin) => {
        dispatch(
            setInfoAdmin({
                _id: admin._id,
                name: admin.name
            })
        );
        dispatch(setVisibleModalDeleteAdmin(true));
    };

    // const handleUpdateStatusAdmin = (admin) => {
    //     dispatch(handleChangeStatusAdmin(
    //         admin._id,
    //         admin.status === ACTIVE_STATUS.LOCK ? ACTIVE_STATUS.UNLOCK : ACTIVE_STATUS.LOCK
    //     ));
    // };

    const handleChangeTableAdmin = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getListAdmins());
    };

    const handleChangePaginationAdmin = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(getListAdmins());
    };

    const handleDeleteAdminAlert = async (record) => {
        const result = await Swal.fire({
            title: `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Bạn có chắn chắn muốn xóa quản trị viên <strong>${record.name}</strong> không?
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
            dispatch(handleDeleteAdmin(record._id));
        }
    };

    const redirectProjectAdmins = (admin_id) => {
        navigate(`/${admin_id}/projects`)
    }

    return {
        handleShowModalUpdateAdmin,
        handleShowModalChangePassAdmin,
        handleShowModalDeleteAdmin,
        handleChangeTableAdmin,
        handleDeleteAdminAlert,
        redirectProjectAdmins,
        handleChangePaginationAdmin
    };
}
