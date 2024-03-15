import {ACTIVE_STATUS} from '@/utils/constants';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import { setDataChangePassAdmin, setDataFilter, setErrorDataChangePassAdmin, setErrorInfoAdmin, 
    setInfoAdmin, setVisibleModalChangePass, setVisibleModalCreateAdmin, setVisibleModalDeleteAdmin,
    setVisibleModalUpdateAdmin
} from '@/states/modules/admin';

import { getListAdmins, handleDeleteAdmin } from '@/api/admin';
import { useNavigate } from 'react-router-dom';
import { createProjectAdmin, getListProjectAdmins, updateProjectAdmin } from '@/api/projectAdmin';
import { setDataFilterProjectAdmin, setErrorInfoProjectAdmin, setInfoProjectAdmin, setProjectAdminActive, setVisibleModalCreateProjectAdmin, setVisibleModalDeleteProjectAdmin, setVisibleModalUpdateProjectAdmin } from '@/states/modules/projectAdmin';

export default function Handle() {
    const navigate = useNavigate()
    const dataFilter = useSelector((state) => state.admin.dataFilter);
    const dataFilterProject = useSelector((state) => state.projectAdmin.dataFilter)
    const dispatch = useDispatch();
    const errorInfoProjectAdmin = useSelector((state) => state.projectAdmin.errorInfoProject);
    const visibleModalCreateProjectAdmin = useSelector((state)=> state.projectAdmin.visibleModalCreateProjectAdmin);
    const visibleModalUpdateProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalUpdateProjectAdmin);
    const visibleModalDeleteProjectAdmin = useSelector((state) => state.projectAdmin.visibleModalDeleteProjectAdmin);
    const isLoadingBtnDeleteProjectAdmin = useSelector((state) => state.projectAdmin.isLoadingBtnDeleteProjectAdmin);
    const infoProjectAdmin = useSelector((state)=> state.projectAdmin.infoProject);
    const handleShowModalCreateAdmin = () => {
        dispatch(
            setInfoAdmin({
                name: '',
                email: '',
                password: ''
            })
        );
        dispatch(setVisibleModalCreateAdmin(true))
    };

    const handleCancelModalUpdateAdmin = () => {
        dispatch(setVisibleModalUpdateAdmin(false))
    }

    const handleCancelModalDeleteAdmin = () => {
        dispatch(setVisibleModalDeleteAdmin(false));
    };

    const handleCancelModalChangePass = () => {
        dispatch(
            setDataChangePassAdmin({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(
            setErrorDataChangePassAdmin({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(setVisibleModalChangePass(false));
    };
    const handleCancelModalCreateProjectAdmin = () =>{
        dispatch(
            setErrorInfoProjectAdmin({
                _id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );

        dispatch(
            setErrorInfoProjectAdmin({
                id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProjectAdmin(false));
    };

    const handleShowModalCreateProjectAdmin = () => {
        dispatch(
            setInfoProjectAdmin({
                _id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProjectAdmin(true))
    };

    const handleCancelModalUpdateProjectAdmin = () => {
        dispatch(setProjectAdminActive(null))
        dispatch(setVisibleModalUpdateProjectAdmin(false))
    }

    const handleCancelModalDeleteProjectAdmin = () => {
        dispatch(setVisibleModalDeleteProjectAdmin(false));
    };

    const handleSearchProjectAdmin = (value) => {
        dispatch(
            setDataFilterProjectAdmin({ ...dataFilterProject, keySearch: value }));
        // if (!value) {
        // }
        dispatch(getListProjectAdmins());
    };

    const handleEnterSearchProjectAdmin = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListProjectAdmins());
        }
    };

    const handleChangeSelectProjectAdmin = (perPage) => {
        dispatch(setDataFilterProjectAdmin({ perPage, page: 1 }));
        dispatch(getListProjectAdmins());
    };

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(infoProjectAdmin);
        let dataError = _.cloneDeep(errorInfoProjectAdmin);
        data[type] = value;
        dataError[type] = '';
        dispatch(setInfoProjectAdmin(data));
        dispatch(setErrorInfoProjectAdmin(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorInfoProjectAdmin);
        dataError[type] = '';
        dispatch(setErrorInfoProjectAdmin(dataError));
    };

    const handleSubmit = (type, scheme, dataProject) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(createProjectAdmin(data)),
                onError: (error) => dispatch(setErrorInfoProjectAdmin(error))
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(updateProjectAdmin( data)),
                onError: (error) => dispatch(setErrorInfoProjectAdmin(error))
            });
        }
    };
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

    const handleChangeTableAdmin = (pagination, filters, sorter = {order : '' , field: ''}) => {
        const sortOrder =  (sorter.order && sorter.field ) ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        // dispatch(
        //     setDataFilter({
        //         ...dataFilter,
        //         sort_order: sortOrder,
        //         column: column
        //     })
        // );
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
            cancelButtonText: 'Close',
            confirmButtonText: 'Delete',
            customClass: {
                popup: '!w-[416px] !h-[296px] !px-11 !important',
                cancelButton: 'hover:!bg-blue-95 hover:!text-blue-55 p-2.5 px-6 rounded-lg !text-black-title !font-semibold !outline-none mx-[5px] !mt-[-60px]',
                confirmButton: 'hover:!bg-[#D81A48] p-2.5 px-7 rounded-lg !bg-[#F8285A] !text-white !font-semibold !outline-none mx-[5px] !mt-[-60px]'
            }
        });
        if (result.isConfirmed) {
            dispatch(handleDeleteAdmin(record._id));
        }
    };

    const redirectProjectAdmins = (admin_id) => {
        navigate(`/${admin_id}/projects`)
    }

    const handleClick = (admin_id) =>{
        dispatch(getListProjectAdmins(admin_id));
    }

    const handleEnterSearchAdmin = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListAdmins());
        }
    };

    const handleSearchAdmin = (value) => {
        dispatch(setDataFilter(
            { 
                keySearch: value,
                perPage: dataFilter.perPage,
                page: dataFilter.page,
                sort_order: dataFilter.sort_order,
                column: dataFilter.column
            
            }));
        if (!value) {
            dispatch(getListAdmins());
        }
    };

    return {
        handleShowModalUpdateAdmin,
        handleShowModalChangePassAdmin,
        handleShowModalDeleteAdmin,
        handleChangeTableAdmin,
        handleDeleteAdminAlert,
        redirectProjectAdmins,
        handleChangePaginationAdmin,
        handleClick,
        dataFilter,
        dataFilterProject ,
        handleSearchProjectAdmin,
        handleEnterSearchProjectAdmin,
        handleShowModalCreateProjectAdmin,
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
        handleCancelModalDeleteProjectAdmin,
        handleChangeSelectProjectAdmin,
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleShowModalCreateAdmin,
        handleCancelModalUpdateAdmin,
        handleCancelModalChangePass,
        handleCancelModalDeleteAdmin,
        handleEnterSearchAdmin,
        handleSearchAdmin
    };
}
