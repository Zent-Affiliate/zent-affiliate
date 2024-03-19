import callApi from '@/api/callApi';
import {
    changePassWordAdmin,
    changePassWordAdminFail,
    changePassWordAdminSuccess,
    changeStatusAdmin,
    changeStatusAdminFail,
    changeStatusAdminSuccess,
    createAdmin,
    createAdminFail,
    createAdminSuccess,
    deleteAdmin,
    deleteAdminFail,
    deleteAdminSuccess,
    getDetailAdmin,
    getDetailAdminFailure,
    getDetailAdminSuccess,
    getListAdmin,
    getListAdminFailure,
    getListAdminSuccess,
    updateAdmin,
    updateAdminFail,
    updateAdminSuccess
} from '@/states/modules/admin';
import _ from 'lodash';

export const getListAdmins = () => async (dispatch, getState) => {
    const dataFilter = getState().admin.dataFilter;
    let path = `admins?page=${dataFilter.page}&per_page=${dataFilter.perPage}`;
    
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
            getListAdmin,
            getListAdminSuccess,
            getListAdminFailure
        ],
        variables: {},
        dispatch,
        getState
    });
};

export const getDetailAdmins = (id) => (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `admins/${id}`,
        actionTypes: [
            getDetailAdmin,
            getDetailAdminSuccess,
            getDetailAdminFailure
        ],
        variables: {},
        dispatch,
        getState
    });
};

export const handleCreateAdmin = (data) => async (dispatch, getState) => {

    return callApi({
        method: 'post',
        apiPath: 'admins',
        actionTypes: [
            createAdmin,
            createAdminSuccess,
            createAdminFail
        ],
        variables: {...data},
        dispatch,
        getState
    });
};

export const handleUpdateAdmin = (id, data) => async (dispatch, getState) => {

    let dataAdmin = _.cloneDeep(data);
    delete dataAdmin?._id;

    return callApi({
        method: 'put',
        apiPath: `admins/${id}`,
        actionTypes: [
            updateAdmin,
            updateAdminSuccess,
            updateAdminFail
        ],
        variables: {...dataAdmin},
        dispatch,
        getState,
    });
};

// export const handleChangeStatusAdmin = (id, data) => async (dispatch, getState) => {
//     return callApi({
//         method: 'put',
//         apiPath: `admins/update-status/${id}`,
//         actionTypes: [
//             changeStatusAdmin,
//             changeStatusAdminSuccess,
//             changeStatusAdminFail
//         ],
//         variables: {
//             status: data
//         },
//         dispatch,
//         getState
//     });
// };

export const handleChangePassAdmin = (id, data) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `admins/reset-password/${id}`,
        actionTypes: [
            changePassWordAdmin,
            changePassWordAdminSuccess,
            changePassWordAdminFail
        ],
        variables: {
            ...data
        },
        dispatch,
        getState
    });
};

export const handleDeleteAdmin = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `admins/${id}`,
        actionTypes: [
            deleteAdmin,
            deleteAdminSuccess,
            deleteAdminFail
        ],
        variables: {},
        dispatch,
        getState
    });
};



