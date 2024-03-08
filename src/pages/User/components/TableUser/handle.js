import {getListUsers} from '@/api/users';
import {setDataFilter} from '@/states/modules/user';
import {useDispatch, useSelector} from 'react-redux';
import {goToPage} from '@/states/modules/app/index.js';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);

    const handleChangeTableUser = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getListUsers());
    };

    const handleChangePaginationUser = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(getListUsers());
    };

    const handleOpenCommission = (userId) => {
        dispatch(goToPage({path: `/users/${userId}`}));
    };

    return {
        handleChangeTableUser,
        handleChangePaginationUser,
        handleOpenCommission
    };
}
