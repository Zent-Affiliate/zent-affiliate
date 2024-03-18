import callApi from '@/api/callApi';
import {getListUser, getListUserFailure, getListUserSuccess} from '@/states/modules/user';

export const requestGetListUser = () => async (dispatch, getState) => {
    const id = getState().app.location.params.project_id;
    const dataFilter = getState().user.dataFilter;
    let path = `users/${id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.sort_order) {
        path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            getListUser,
            getListUserSuccess,
            getListUserFailure
        ],
        variables: {},
        dispatch,
        getState
    });
};
