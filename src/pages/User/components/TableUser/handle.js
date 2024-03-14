import {getListUsers} from '@/api/users';
import {setDataFilter} from '@/states/modules/user';
import {useDispatch, useSelector} from 'react-redux';
import {goToPage} from '@/states/modules/app/index.js';
import {isRouteActive} from '@/utils/helper.js';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);
    const location = useSelector(state => state.app.location);

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
        window.open(`/${isRouteActive('/my-project-detail/:project_id/users') ? 'my-' : ''}project-detail/${location.params.project_id}/users/${userId}`, '_blank');
        // dispatch(goToPage({
        //     path: `/${isRouteActive('/my-project-detail/:project_id/users') ? 'my-' : ''}project-detail/${location.params.project_id}/users/${userId}`
        // }));
    };

    return {
        handleChangeTableUser,
        handleChangePaginationUser,
        handleOpenCommission
    };
}
