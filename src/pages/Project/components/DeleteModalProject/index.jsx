import React from 'react';

function ModalDeleteProject({content}) {
    return (
        <div>
           Are you sure you want to delete the project? <strong>{content}</strong> ?
        </div>
    );
}

export default ModalDeleteProject;
