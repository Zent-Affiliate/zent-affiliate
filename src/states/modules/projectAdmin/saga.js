import {
    all, fork, put, select, takeLatest, call
} from "redux-saga/effects";
import { setBreadcrumb, setTitlePage } from "../app/index.js";
import { getNotification } from "../../../utils/helper.js";
import _ from "lodash";
import {
    createProjectAdminFail,
    createProjectAdminSuccess,
    deleteProjectAdminFail,
    deleteProjectAdminSuccess,
    getListProjectAdminSuccess,
    setErrorInfoProjectAdmin,
    setVisibleModal,
    updateProjectAdminFail,
    updateProjectAdminSuccess
} from "./index.js";
import { getListProjectAdmins } from "@/api/projectAdmin/index.js";
function* loadRouteData() {
    const { app } = yield select();

    yield put(getListProjectAdmins())
    yield put(setTitlePage('List of Project'));
    yield put(setBreadcrumb([
        {
            path: '/',
            name: 'Trang chủ'
        },
        {
            path: '/admin-management',
            name: 'Admin Management'
        },
        {
            path: `/${app.location.params.admin_id}/projects`,
            name: 'List of Project'
        },
    ]))
}

function* handleActions() {
    yield takeLatest(getListProjectAdminSuccess, function* () {
        const { projectAdmin } = yield select();
        yield put(setTitlePage(`List of Project - ${projectAdmin.admin.name}`));
    });

    yield takeLatest(createProjectAdminSuccess, function* () {
        const { app, projectAdmin } = yield select();
        getNotification('success', 'Created a new project successfully');
        yield put(getListProjectAdmins(app.location.params.id, {
            ...projectAdmin.dataFilter
        }));
    });

    yield takeLatest(createProjectAdminFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.detail
            yield put(setErrorInfoProjectAdmin({
                code: _.get(errors, 'code', ''),
                name: _.get(errors, 'name', ''),
                secret_key: _.get(errors, 'secret_key', ''),
            }));
        } else if (statusError === 401) {
            getNotification('error', 'Invalid information.');
        } else {
            getNotification('error', 'An error occurred, please try again later!');
        }
    });

    yield takeLatest(updateProjectAdminSuccess, function* () {
        const { app, projectAdmin } = yield select();
        getNotification('success', 'Project updated successfully');
        yield put(getListProjectAdmins(app.location.params.id, {
            ...projectAdmin.dataFilter
        }));
    });

    yield takeLatest(updateProjectAdminFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 400) {
            let errors = action.payload.data.detail
            let errorId = _.get(errors, 'id', '')
            if (errorId) {
                getNotification('error', errorId);
            }
            yield put(setErrorInfoProjectAdmin({
                code: _.get(errors, 'code', ''),
                name: _.get(errors, 'name', ''),
                secret_key: _.get(errors, 'secret_key', ''),
            }));
        } else if (statusError === 401) {
            getNotification('error', 'Invalid information.');
        } else {
            getNotification('error', 'An error occurred, please try again later!');
        }
    });

    yield takeLatest(deleteProjectAdminSuccess, function* () {
        getNotification('success', 'Successfully deleted class session');
        const { app, projectAdmin } = yield select();
        yield put(getListProjectAdmins(app.location.params.id, {
            ...projectAdmin.dataFilter
        }));
    });

    yield takeLatest(deleteProjectAdminFail, function* (action) {
        let statusError = action.payload.status
        if (statusError === 401 || statusError === 400) {
            let errorId = _.get(action.payload.data.errors, 'id[0]', '')
            yield call(getNotification, 'error', (errorId ? errorId : 'Invalid information.'));
        } else {
            yield call(getNotification, 'error', 'An error occurred, please try again later!');
        }
    });
}
export default function* loadProjectAdminSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}