import { getListSecretKey, getListSecretKeyFailure, getListSecretKeySuccess } from "@/states/modules/secretKey";
import callApi from "../callApi";

export const getSecretKey = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: '/projects/proposed-secret-key',
        actionTypes: [
            getListSecretKey,
            getListSecretKeySuccess,
            getListSecretKeyFailure
        ],
        variables: {},
        dispatch,
        getState
    });
};