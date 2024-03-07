import React, {useEffect} from 'react'
import MainLayout from '@/layouts/MainLayout/index.jsx'
import {setBreadcrumb} from '@/states/modules/app'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Input, Select} from 'antd'
import InlineSVG from 'react-inlinesvg'
import PlusIcon from '@/assets/images/icons/light/plus.svg'
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg'
import ModalDefault from '@/components/Modal'
import TableUser from './components/TableUser'
import ModalCreateUser from './components/CreateModalUser'
import Handle from './handle'
import ModalUpdateUser from './components/UpdateModalUser'
import ModalChangePassUser from './components/ModalChangePass'
import ModalDeleteDefault from '@/components/ModalDelete'
import ModalDeleteUser from './components/DeleteModalUser'
import {handleDeleteUser} from '@/api/users'

function User() {
  const dispatch = useDispatch()
  const visibleModalCreateUser = useSelector((state) => state.user.visibleModalCreateUser)
  const visibleModalUpdateUser = useSelector((state) => state.user.visibleModalUpdateUser)
  const visibleModalDeleteUser = useSelector((state) => state.user.visibleModalDeleteUser)
  const visibleModalChangePass = useSelector((state) => state.user.visibleModalChangePass)
  const isLoadingBtnDeleteUser = useSelector((state) => state.user.isLoadingBtnDeleteUser)
  const dataFilter = useSelector((state) => state.user.dataFilter)
  const infoUser = useSelector((state) => state.user.infoUser)
  const paginationListUsers = useSelector((state) => state.user.paginationListUsers)
  const selectLimit = [20, 50, 100]
  
  const {
    handleCancelModalCreateUser,
    handleCancelModalUpdateUser,
    handleCancelModalDeleteUser,
    handleCancelModalChangePass,
    handleSearchUser,
    handleEnterSearchUser,
    handleChangeSelectUser,
    handleShowModalCreateUser,
  } = Handle()
  
  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/users',
        name: 'Quản lý người dùng',
      },
    ]
    dispatch(setBreadcrumb(dataBreadcrumb))
    
    return () => dispatch(setBreadcrumb([]))
  }, [dispatch])
  
  return (
    <MainLayout>
      <div className={`bg-white rounded-lg border shadow-sm`}>
        <div className={`py-5 px-7`}>
          <div className={`flex justify-between mb-2.5`}>
            <div className={`w-96`}>
              <Input
                value={dataFilter.keySearch}
                onKeyDown={(e) => handleEnterSearchUser(e)}
                onChange={(e) => handleSearchUser(e.target.value)}
                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt=""/>}
                className={`main-input`}
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
              />
            </div>
            
            <div>
              <Button
                icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} alt=""/>}
                className={`flex items-center ant-btn-primary h-full`}
                onClick={handleShowModalCreateUser}
              >
                Tạo mới
              </Button>
            </div>
          </div>
          
          <div className={`relative main-select`}>
            <TableUser/>
            <Select
              className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
              value={paginationListUsers.perPage}
              options={selectLimit.map((value) => ({value, label: `Hiển thị ${value}`}))}
              onChange={(e) => handleChangeSelectUser(e)}
            />
          </div>
          
          <ModalDefault
            isModalOpen={visibleModalCreateUser}
            handleCancel={handleCancelModalCreateUser}
            title="Tạo mới người dùng"
          >
            <ModalCreateUser/>
          </ModalDefault>
          
          <ModalDefault
            isModalOpen={visibleModalUpdateUser}
            handleCancel={handleCancelModalUpdateUser}
            title="Cập nhật thông tin"
          >
            <ModalUpdateUser/>
          </ModalDefault>
          
          <ModalDefault
            isModalOpen={visibleModalChangePass}
            handleCancel={handleCancelModalChangePass}
            title="Đổi mật khẩu"
          >
            <ModalChangePassUser/>
          </ModalDefault>
          
          <ModalDeleteDefault
            loading={isLoadingBtnDeleteUser}
            isModalOpen={visibleModalDeleteUser}
            handleCancel={handleCancelModalDeleteUser}
            handleConfirm={() => dispatch(handleDeleteUser(infoUser._id))}
            content={<ModalDeleteUser content={infoUser.name}/>}
            contentBtn="Xóa"
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default User
