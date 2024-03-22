import React from 'react';

function ModalDeleteUser({content}) {
    return (
        <div>
            Bạn có chắn chắn muốn xóa quản trị viên <strong>{content}</strong> không?
        </div>
    );
}

export default ModalDeleteUser;
