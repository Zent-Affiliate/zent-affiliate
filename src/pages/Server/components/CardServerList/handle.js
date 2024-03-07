import {
  setConfigModal,
  setErrorInfoServer,
  setInfoServer,
  setVisibleModalDeleteServer,
  setVisibleModalCreateOrUpdateServer,
} from '@/states/modules/server';
import Swal from 'sweetalert2';
import {useDispatch} from 'react-redux';
import { handleDeleteServer } from '@/api/server';

export default function Handle() {
  const dispatch = useDispatch();
  const handleShowModalUpdateServer = (server, type) => {
    dispatch(setConfigModal({
      title: "Cập nhật thông tin máy chủ",
      type
    }));
    dispatch(
      setInfoServer({
        id: server._id,
        name: server.name,
        ip: server.ip,
        other_ip: server.ip,
        tags: server.tags?.map((tag) => tag._id),
        totalProject: server.project_total
      })
    );
    dispatch(
      setErrorInfoServer({
        name: '',
        ip: '',
        tags: '',
      })
    );
    dispatch(setVisibleModalCreateOrUpdateServer(true));
  }
  
  const handleShowModalDeleteServer = (server) => {
    dispatch(setInfoServer({_id: server._id, name: server.name}));
    dispatch(setVisibleModalDeleteServer(true));
  }

  const handleDeleteServerAlert = (item) => {
    const existProject = item.project_total > 0
    return Swal.fire({
      title: !existProject ? `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Bạn có chắn chắn muốn xóa máy chủ <strong>${item.name}</strong> không?
      </p>`:
      `<p class="text-base !mt-[-74px] !overflow-visible !font-normal">
        Đã có dự án tồn tại tại trên máy chủ <strong>${item.name}</strong>. Bạn có chắc chắn muốn xóa không??
      </p>`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      cancelButtonText: "Đóng",
      confirmButtonText: "Xóa",
      customClass: {
        popup: '!w-[416px] !h-[296px] !px-11 !important',
        confirmButton: 'hover:!bg-[#D81A48] p-2.5 px-7 rounded-lg !bg-[#F8285A] !text-white !font-semibold !outline-none mx-[5px] !mt-[-60px]',
        cancelButton: 'hover:!bg-blue-95 hover:!text-blue-55 p-2.5 px-6 rounded-lg !text-black-title !font-semibold !outline-none mx-[5px] !mt-[-60px]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleDeleteServer(item._id));
      }
    });
  };
  
  return {
    handleShowModalUpdateServer,
    handleDeleteServerAlert,
    handleShowModalDeleteServer
  }
}
