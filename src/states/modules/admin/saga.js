import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {
    changeStatusAdminSuccess,
    createAdminFail,
    createAdminSuccess,
    deleteAdminFail,
    deleteAdminSuccess,
    setDataFilter,
    setErrorInfoAdmin,
    setVisibleModalCreateAdmin,
    setVisibleModalDeleteAdmin,
    setVisibleModalUpdateAdmin,
    updateAdminFail,
    updateAdminSuccess
} from '.';
import {handleNotification} from '@/utils/helper';
import {getListAdmins} from '@/api/admin';
import {
    createProjectAdminFail,
    createProjectAdminSuccess,
    deleteProjectAdminFail,
    deleteProjectAdminSuccess,
    setErrorInfoProjectAdmin,
    updateProjectAdminFail,
    updateProjectAdminSuccess
} from '../projectAdmin';
import {getListProjectAdmins} from '@/api/projectAdmin';
import _ from 'lodash';

function* loadRouteData() {
    yield put(setTitlePage('Admin Management'));
    yield put(setDataFilter({
        keySearch: '',
        perPage: 20,
        page: 1,
        sort_order: null,
        column: null
    }));
    yield put(getListAdmins());
    yield put(setBreadcrumb([
        {
            path: '/',
            name: 'Home'
        },

        {
            path: '/admin-management',
            name: 'Admin Management'
        }
    ]));
}

function* handleActions() {
    yield takeLatest(changeStatusAdminSuccess, function* () {
        yield put(getListAdmins());
        handleNotification('success', 'Status change successfully.');
    });

    yield takeLatest(createAdminSuccess, function* () {
        yield put(getListAdmins());
        yield put(setVisibleModalCreateAdmin(false));
        handleNotification('success', 'Create admin successfully.');
    });

    yield takeLatest(createAdminFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoAdmin({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Create new admin fail.');
        }
    });

    yield takeLatest(updateAdminSuccess, function* () {
        yield put(getListAdmins());
        yield put(setVisibleModalUpdateAdmin(false));
        handleNotification('success', 'Update admin success..');
    });

    yield takeLatest(updateAdminFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoAdmin({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Update new admin unsuccessful.');
        }
    });

    yield takeLatest(createProjectAdminSuccess, function* () {
        let {admin} = yield select();
        yield put(getListProjectAdmins(admin.adminSelected));
        yield put(getListAdmins());
        handleNotification('success', 'Create Project Successfully');
    });

    yield takeLatest(createProjectAdminFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorInfoProjectAdmin({
                code: _.get(errors, 'code', ''),
                name: _.get(errors, 'name', ''),
                secret_key: _.get(errors, 'secret_key', '')
            }));
        } else if (statusError === 401) {
            handleNotification('error', 'Invalid information.');
        } else {
            handleNotification('error', 'An error occurred, please try again later!');
        }
    });

    yield takeLatest(updateProjectAdminSuccess, function* () {
        const {admin, projectAdmin} = yield select();
        handleNotification('success', 'Updated successfully');
        yield put(getListProjectAdmins(admin.adminSelected, {
            ...projectAdmin.dataFilter
        }));
    });

    yield takeLatest(updateProjectAdminFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorInfoProjectAdmin({
                code: _.get(errors, 'code', ''),
                name: _.get(errors, 'name', ''),
                secret_key: _.get(errors, 'secret_key', '')
            }));
        } else if (statusError === 401) {
            handleNotification('error', 'Invalid information.');
        } else {
            handleNotification('error', 'An error occurred, please try again later!');
        }
    });

    yield takeLatest(deleteProjectAdminSuccess, function* () {
        handleNotification('success', 'Delete Successfully');
        const {app, projectAdmin} = yield select();
        yield put(getListAdmins());
        yield put(getListProjectAdmins(app.location.params.id, {
            ...projectAdmin.dataFilter
        }));
    });

    yield takeLatest(deleteProjectAdminFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 401 || statusError === 400) {
            let errorId = _.get(action.payload.data.errors, 'id[0]', '');
            handleNotification('error', (errorId ? errorId : 'Invalid information.'));
        } else {
            handleNotification('error', 'An error occurred, please try again later!');
        }
    });

    yield takeLatest(deleteAdminSuccess, function* () {
        handleNotification('success', 'Delete successfully');
        yield put(getListAdmins());
        yield put(setVisibleModalDeleteAdmin(false));
    });

    yield takeLatest(deleteAdminFail, function* () {
        yield call(handleNotification, 'error', 'Delete failed.');
    });
}

export default function* adminSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}