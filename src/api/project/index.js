import {
    createProject, createProjectFail, createProjectSuccess,
    deleteProjectFail, deleteProjectSuccess, deleteProject,
    getListProject, updateProject, updateProjectFail,
    updateProjectSuccess,
    getListProjectFailure,
    getListProjectSuccess, getRecommendKey, getRecommendKeySuccess, getRecommendKeyFailure
} from '@/states/modules/project';
import callApi from "../callApi";

import _ from "lodash";

export const getListProjects = () => async(dispatch, getState) => {
    const dataFilter = getState().project.dataFilter;
    let path = `projects?q=&page=${dataFilter.page}&per_page=${dataFilter.perPage}`;
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
            getListProject,
            getListProjectSuccess,
            getListProjectFailure,
        ],
        dispatch,
        getState
    })
}

export const handleCreateProject = (data) => async (dispatch, getState) => {

    return callApi({
        method: 'post',
        apiPath: 'projects',
        actionTypes: [
            createProject,
            createProjectSuccess,
            createProjectFail
        ],
        variables: {...data},
        dispatch,
        getState
    });
};

export const handleUpdateProject = (data) => async (dispatch, getState) => {

    let dataProject = _.cloneDeep(data);
    delete dataProject?._id;

    const id = getState().project.projectActive._id;

    return callApi({
        method: 'put',
        apiPath: `projects/${id}`,
        actionTypes: [
            updateProject,
            updateProjectSuccess,
            updateProjectFail
        ],
        variables: {...dataProject},
        dispatch,
        getState,
    });
};

export const handleDeleteProject = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `projects/${id}`,
        actionTypes: [
            deleteProject,
            deleteProjectSuccess,
            deleteProjectFail
        ],
        variables: {},
        dispatch,
        getState
    });
};

export const getSecretKey = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: '/projects/proposed-secret-key',
        actionTypes: [
            getRecommendKey,
            getRecommendKeySuccess,
            getRecommendKeyFailure
        ],
        variables: {},
        dispatch,
        getState
    });
};
