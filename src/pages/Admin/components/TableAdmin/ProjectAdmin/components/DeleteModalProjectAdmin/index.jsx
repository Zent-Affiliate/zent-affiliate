import React from 'react';

function ModalDeleteProjectAdmin({content}) {
    return (
        <div>
           Are you sure you want to delete the project <strong>{content}</strong> ?
        </div>
    );
}

export default ModalDeleteProjectAdmin;
