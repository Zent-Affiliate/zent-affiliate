import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {setTitlePage} from '../app';
import {getListUsers} from '@/api/users';
import {
    changePassWordUserFail,
    changePassWordUserSuccess,
    changeStatusUserSuccess,
    createUserFail,
    createUserSuccess,
    deleteUserFail,
    deleteUserSuccess,
    setDataFilter,
    setErrorDataChangePassUser,
    setErrorInfoUser,
    setVisibleModalChangePass,
    setVisibleModalCreateUser,
    setVisibleModalDeleteUser,
    setVisibleModalUpdateUser,
    updateUserFail,
    updateUserSuccess
} from '.';
import {handleNotification} from '@/utils/helper';

function* loadRouteData() {
    yield put(setTitlePage('Quản lý người dùng'));
    yield put(setDataFilter({
        keySearch: '',
        perPage: 20,
        page: 1,
        sort_order: null,
        column: null
    }));
    yield put(getListUsers());
}

function* handleActions() {
    yield takeLatest(changeStatusUserSuccess, function* () {
        yield put(getListUsers());
        handleNotification('success', 'Thay đổi trạng thái thành công.');
    });

    yield takeLatest(createUserSuccess, function* () {
        yield put(getListUsers());
        yield put(setVisibleModalCreateUser(false));
        handleNotification('success', 'Tạo mới người dùng thành công.');
    });

    yield takeLatest(createUserFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoUser({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Tạo mới người dùng thất bại.');
        }
    });

    yield takeLatest(updateUserSuccess, function* () {
        yield put(getListUsers());
        yield put(setVisibleModalUpdateUser(false));
        handleNotification('success', 'Cập nhật người dùng thành công.');
    });

    yield takeLatest(updateUserFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoUser({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Cập nhật người dùng thất bại.');
        }
    });

    yield takeLatest(changePassWordUserSuccess, function* () {
        handleNotification('success', 'Thay đổi mật khẩu thành công.');
        yield put(setVisibleModalChangePass(false));
    });

    yield takeLatest(changePassWordUserFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorDataChangePassUser({
                    ...errors
                })
            );
        }
        handleNotification('error', 'Thay đổi mật khẩu thất bại.');
    });

    yield takeLatest(deleteUserSuccess, function* () {
        handleNotification('success', 'Xoá người dùng thành công.');
        yield put(setVisibleModalDeleteUser(false));
        yield put(getListUsers());
    });

    yield takeLatest(deleteUserFail, function* () {
        yield call(handleNotification, 'error', 'Xoá người dùng thất bại.');
    });
}

export default function* userSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
