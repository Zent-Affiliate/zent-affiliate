import {getListUsers, handleChangeStatusUser, handleDeleteUser} from '@/api/users';
import {
    setDataChangePassUser,
    setDataFilter,
    setErrorInfoUser,
    setInfoUser,
    setVisibleModalChangePass,
    setVisibleModalDeleteUser,
    setVisibleModalUpdateUser
} from '@/states/modules/user';
import {ACTIVE_STATUS} from '@/utils/constains';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);

    const handleShowModalUpdateUser = (user) => {
        dispatch(setInfoUser({...user, avatarUrl: user.avatar}));
        dispatch(
            setErrorInfoUser({
                name: '',
                email: '',
                phone: '',
                avatar: '',
                avatarUrl: '',
                password: ''
            })
        );
        dispatch(setVisibleModalUpdateUser(true));
    };

    const handleShowModalChangePassUser = (user) => {
        dispatch(setDataChangePassUser({_id: user._id}));
        dispatch(setVisibleModalChangePass(true));
    };

    const handleShowModalDeleteUser = (user) => {
        dispatch(
            setInfoUser({
                _id: user._id,
                name: user.name
            })
        );
        dispatch(setVisibleModalDeleteUser(true));
    };

    const handleUpdateStatusUser = (user) => {
        dispatch(handleChangeStatusUser(
            user._id,
            user.status === ACTIVE_STATUS.LOCK ? ACTIVE_STATUS.UNLOCK : ACTIVE_STATUS.LOCK
        ));
    };

    const handleChangeTableUser = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getListUsers());
    };

    const handleChangePaginationUser = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(getListUsers());
    };

    const handleDeleteUserAlert = (record) => {
        return Swal.fire({
            title: `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Bạn có chắn chắn muốn xóa người dùng <strong>${record.name}</strong> không?
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
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(handleDeleteUser(record._id));
            }
        });
    };

    return {
        handleShowModalUpdateUser,
        handleShowModalChangePassUser,
        handleShowModalDeleteUser,
        handleUpdateStatusUser,
        handleChangeTableUser,
        handleDeleteUserAlert,
        handleChangePaginationUser
    };
}
