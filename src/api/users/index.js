import callApi from '@/api/callApi';
import {getListUser, getListUserFailure, getListUserSuccess} from '@/states/modules/user';
import { getListUserByRelationship, getListUserByRelationshipSuccess, getListUserByRelationshipFail} from '@/states/modules/commission'

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

export const requestGetListUserByRelationship = () => async (dispatch, getState) => {
    const project_id = getState().app.location.params.project_id;
    const user_id = getState().app.location.params.id;
    const dataFilter = getState().commission.dataFilterUsers;
    let path = `users/${project_id}/${user_id}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
            getListUserByRelationship, getListUserByRelationshipSuccess, getListUserByRelationshipFail
        ],
        variables: {},
        dispatch,
        getState
    });
};
