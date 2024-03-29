import {getListProjects, handleDeleteProject} from '@/api/project'
import {getAllServers} from '@/api/server'
import {getListTags} from '@/api/tag'
import {
  setDataFilter,
  setErrorInfoProject,
  setInfoProject,
  setVisibleModalDeleteProject,
  setVisibleModalUpdateProject,
} from '@/states/modules/project'
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.project.dataFilter)
  
  const handleChangeTableProject = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      dispatch(
        setDataFilter({
          ...dataFilter,
          field: sorter.field,
          sortOrder: sorter.sortOrder === 'descend' ? 'desc' : 'asc',
        })
      )
    } else {
      dispatch(
        setDataFilter({
          ...dataFilter,
          field: null,
          sortOrder: null,
        })
      )
    }
    dispatch(getListProjects())
  }
  
  const handleChangePaginationProject = (event) => {
    dispatch(
      setDataFilter({
        ...dataFilter,
        page: event,
      })
    )
    dispatch(getListProjects())
  }
  
  const handleShowModalUpdateProject = (project) => {
    dispatch(getAllServers())
    dispatch(getListTags())
    dispatch(
      setInfoProject({
        ...project,
        server: project.server._id,
        tags: project.tags?.map((tag) => tag._id),
      })
    )
    dispatch(
      setErrorInfoProject({
        name: '',
        doamin: '',
        server: '',
        tags: '',
      })
    )
    dispatch(setVisibleModalUpdateProject(true))
  }
  
  const handleShowModalDeleteProject = (project) => {
    dispatch(setInfoProject({_id: project._id, name: project.name}))
    dispatch(setVisibleModalDeleteProject(true))
  }

  const handleDeleteProjectAlert = (record) => {
    return Swal.fire({
      title: `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Bạn có chắn chắn muốn xóa dự án <strong>${record.name}</strong> không?
      </p>`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: "Đóng",
      confirmButtonText: "Xóa",
      customClass: {
        popup: '!w-[416px] !h-[296px] !px-11 !important ',
        confirmButton: 'hover:!bg-[#D81A48] p-2.5 px-7 rounded-lg !bg-[#F8285A] !text-white !font-semibold !outline-none mx-[5px] !mt-[-60px]',
        cancelButton: 'hover:!bg-blue-95 hover:!text-blue-55 p-2.5 px-6 rounded-lg !text-black-title !font-semibold !outline-none mx-[5px] !mt-[-60px]',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteProject(record._id));
      }
    });
  };

  return {
    handleChangeTableProject,
    handleChangePaginationProject,
    handleShowModalUpdateProject,
    handleDeleteProjectAlert,
    handleShowModalDeleteProject,
  }
}
