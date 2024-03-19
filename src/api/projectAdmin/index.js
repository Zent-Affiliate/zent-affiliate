import callApi from "../callApi.js";
import {
    createProjectAdminFail, createProjectAdminSuccess,
    deleteProjectAdminFail,
    deleteProjectAdminSuccess,
    getListProjectAdmin, getListProjectAdminFail, getListProjectAdminSuccess,
    startCreateProjectAdmin, startDeleteProjectAdmin, startGetListAdmins, startUpdateProjectAdmin, updateProjectAdminFail, updateProjectAdminSuccess
} from "../../states/modules/projectAdmin/index.js";

export const getListProjectAdmins = (admin_id) => async (dispatch, getState) => {
    const id = admin_id || getState().app.location.params.admin_id;
    const { dataFilter } = getState().projectAdmin;
    let path = `projects/${id}?page=${dataFilter.page}&per_page=${dataFilter.perPage}`

    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.sort_order) {
        path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
    }

    return callApi({
        method: 'get',
        apiPath: path,
        variables: {},
        actionTypes: [
            getListProjectAdmin,
            getListProjectAdminSuccess,
            getListProjectAdminFail,
        ],
        dispatch,
        getState
    })
}

export const createProjectAdmin = (data) => async (dispatch, getState) => {
    const id = getState().app.location.params.admin_id;
    return callApi({
        method: 'post',
        apiPath: `projects/${id}`,
        actionTypes: [startCreateProjectAdmin, createProjectAdminSuccess, createProjectAdminFail],
        variables: data,
        dispatch,
        getState
    })
}

export const updateProjectAdmin = (data) => async (dispatch, getState) => {
    const id = getState().projectAdmin.infoProject._id
    return callApi({
        method: 'put',
        apiPath: `projects/${id}`,
        actionTypes: [ startUpdateProjectAdmin, updateProjectAdminSuccess, updateProjectAdminFail],
        variables: data,
        dispatch,
        getState
    })
}

export const deleteProjectAdmin = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `projects/${id}`,
        actionTypes: [startDeleteProjectAdmin, deleteProjectAdminSuccess, deleteProjectAdminFail],
        variables: {},
        dispatch,
        getState
    })
}

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
            startGetListAdmins,
            getListProjectAdminSuccess,
            getListProjectAdminFail
        ],
        variables: {},
        dispatch,
        getState
    });
};