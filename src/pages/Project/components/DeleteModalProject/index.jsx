import React from 'react'

function ModalDeleteProject({content}) {
  return (
    <>
      <div>Hành động của bạn không thể hoàn tác</div>
      <div>Bạn có chắn chắn muốn xóa dự án <strong>{content}</strong> không?</div>
    </>
  )
}

export default ModalDeleteProject
