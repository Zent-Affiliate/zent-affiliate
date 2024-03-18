import React from 'react';

function ModalDeleteProject({content}) {
    return (
        <div>
            Bạn có chắn chắn muốn xóa dự án <strong>{content}</strong> không?
        </div>
    );
}

export default ModalDeleteProject;
