import React from 'react';

function ModalDeleteProjectAdmin({content}) {
    return (
        <div>
            Bạn có chắn chắn muốn xóa dự án <strong>{content}</strong> không?
        </div>
    );
}

export default ModalDeleteProjectAdmin;
