import React from 'react'

function ModalDeleteUser({content}) {
  return (
    <div>
      Bạn có chắn chắn muốn xóa người dùng <strong>{content}</strong> không?
    </div>
  )
}

export default ModalDeleteUser
