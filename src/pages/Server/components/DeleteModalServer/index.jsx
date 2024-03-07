import React from 'react';

function ModalDeleteServer({content}) {
  return (
    <div>
      Bạn có chắn chắn muốn xóa server <strong>{content}</strong> không?
    </div>
  )
}

export default ModalDeleteServer;
