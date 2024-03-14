import {useState} from 'react';

export default function Handle() {
    const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);

    const handleOpenConfirmDeleteConfig = () => {
        setVisibleConfirmDelete(true);
    };

    return {
        visibleConfirmDelete,

        handleOpenConfirmDeleteConfig
    };
}