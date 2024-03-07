import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {setTitlePage} from '../app';
import {getListServers} from '@/api/server';
import {
    clearListServer,
    createServerFail,
    createServerSuccess,
    deleteServerFail,
    deleteServerSuccess,
    setDataFilterServer,
    setErrorInfoServer,
    setVisibleModalCreateOrUpdateServer,
    setVisibleModalDeleteServer,
    setVisibleModalWarningServer,
    updateServerFail,
    updateServerSuccess
} from '.';
import {handleNotification} from '@/utils/helper';
import {getListTags} from '@/api/tag';

function* loadRouteData() {
    yield put(setTitlePage('Quản lý máy chủ'));
    yield put(clearListServer());
    yield put(setDataFilterServer({
        keySearch: '',
        perPage: 9,
        page: 1,
        status: '',
        tags: []
    }));
    yield put(getListServers());
    yield put(getListTags());
}

function* handleActions() {
    yield takeLatest(createServerSuccess, function* () {
        yield put(getListTags());
        yield put(clearListServer());
        yield put(getListServers());
        yield put(setVisibleModalCreateOrUpdateServer(false));
        handleNotification('success', 'Tạo mới máy chủ thành công.');
    });

    yield takeLatest(createServerFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoServer({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Tạo mới máy chủ thất bại.');
        }
    });

    yield takeLatest(updateServerSuccess, function* () {
        const {server} = yield select();
        yield put(setDataFilterServer({
            ...server.dataFilterServer,
            page: 1,
            perPage: server.dataFilterServer.page * server.dataFilterServer.perPage
        }));
        yield put(getListTags());
        yield put(clearListServer());
        yield put(getListServers());
        yield put(setVisibleModalCreateOrUpdateServer(false));
        yield put(setVisibleModalWarningServer(false));
        handleNotification('success', 'Cập nhật máy chủ thành công.');
    });

    yield takeLatest(updateServerFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoServer({
                    ...errors
                })
            );
            yield put(setVisibleModalWarningServer(false));
        } else {
            handleNotification('error', 'Cập nhật máy chủ thất bại.');
        }
    });

    yield takeLatest(deleteServerSuccess, function* () {
        yield put(clearListServer());
        yield put(getListServers());
        yield put(setVisibleModalDeleteServer(false));
        handleNotification('success', 'Xóa máy chủ thành công.');
    });

    yield takeLatest(deleteServerFail, function* () {
        yield call(handleNotification, 'error', 'Xóa máy chủ thất bại.');
    });
}

export default function* serverSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
