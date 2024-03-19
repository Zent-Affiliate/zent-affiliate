import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {
    changePassWordAdminFail,
    changePassWordAdminSuccess,
    changeStatusAdminSuccess,
    createAdminFail,
    createAdminSuccess,
    deleteAdminFail,
    deleteAdminSuccess,
    setDataFilter,
    setErrorDataChangePassAdmin,
    setErrorInfoAdmin,
    setVisibleModalChangePass,
    setVisibleModalCreateAdmin,
    setVisibleModalDeleteAdmin,
    setVisibleModalUpdateAdmin,
    updateAdminFail,
    updateAdminSuccess
} from '.';
import {handleNotification} from '@/utils/helper';
import { getListAdmins } from '@/api/admin';

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
    ]))
}

function* handleActions() {
    yield takeLatest(changeStatusAdminSuccess, function* () {
        yield put(getListAdmins());
        handleNotification('success', 'Status change successful.');
    });

    yield takeLatest(createAdminSuccess, function* () {
        yield put(getListAdmins());
        yield put(setVisibleModalCreateAdmin(false));
        handleNotification('success', 'Create new admin success.');
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
            handleNotification('error', 'Create new admin unsuccessful.');
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
                setErrorInfoUser({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Update new admin unsuccessful.');
        }
    });

    yield takeLatest(changePassWordAdminSuccess, function* () {
        handleNotification('success', 'Thay đổi mật khẩu thành công.');
        yield put(setVisibleModalChangePass(false));
    });

    yield takeLatest(changePassWordAdminFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorDataChangePassAdmin({
                    ...errors
                })
            );
        }
        handleNotification('error', 'Thay đổi mật khẩu thất bại.');
    });

    yield takeLatest(deleteAdminSuccess, function* () {
        handleNotification('success', 'Xoá người dùng thành công.');
        yield put(setVisibleModalDeleteAdmin(false));
        yield put(getListAdmins());
    });

    yield takeLatest(deleteAdminFail, function* () {
        yield call(handleNotification, 'error', 'Xoá người dùng thất bại.');
    });
}

export default function* adminSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
