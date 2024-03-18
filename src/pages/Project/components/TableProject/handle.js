import {ACTIVE_STATUS} from '@/utils/constants';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import { setDataFilter,setErrorInfoProject, setInfoProject, setProjectActive, setVisibleModalCreateProject, 
    setVisibleModalDeleteProject, setVisibleModalUpdateProject } from '@/states/modules/project';
import { getListProjects , handleDeleteProject} from '@/api/project';
import { useNavigate } from 'react-router-dom';

export default function Handle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataFilter = useSelector((state) => state.project.dataFilter);

    const handleShowModalUpdateProject = (project) => {
        dispatch(setInfoProject({...project}));
        dispatch(setProjectActive({...project}));
        dispatch(
            setErrorInfoProject({
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalUpdateProject(true));
    };

    const handleShowModalDeleteProject = (project) => {
        dispatch(
            setInfoProject({
                _id: project._id,
                name: project.name,
                code: project.code,
                admin_id: project.admin_id,
                secret_key: project.secret_key
            })
        );
        dispatch(setVisibleModalDeleteProject(true));
    };

    const handleChangeTableProject = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getListProjects());
    };

    const handleChangePaginationProject = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(getListProjects());
    };

    const handleDeleteProjectAlert = async (record) => {
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
            dispatch(handleDeleteProject(record._id));
        }
    };

    const redirectToProject = (project_id) => {
        navigate(`/my-project-detail/${project_id}`)
    }

    return {
        handleShowModalUpdateProject,
        handleShowModalDeleteProject,
        handleChangeTableProject,
        handleDeleteProjectAlert,
        handleChangePaginationProject,
        redirectToProject,
    };
}
