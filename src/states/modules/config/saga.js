import {all, fork, put, takeLatest} from 'redux-saga/effects';
import {setTitlePage} from '../app';
import {getConfigs} from '@/api/config';
import {
    errorConfig,
    errorNotification,
    saveConfigFail,
    saveConfigSuccess,
    saveNotificationFail,
    saveNotificationSuccess,
    setErrorConfig,
    setErrorNotification
} from '.';
import {handleNotification} from '@/utils/helper';

function* loadRouteData() {
    yield put(setTitlePage('Cấu hình'));
    yield put(setErrorConfig(errorConfig));
    yield put(setErrorNotification(errorNotification));
    yield put(getConfigs());
}

function* handleActions() {
    yield takeLatest(saveConfigSuccess, function* () {
        yield put(setErrorConfig(errorConfig));
        handleNotification('success', 'Cấu hình thành công.');
    });

    yield takeLatest(saveConfigFail, function* () {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorConfig({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Cấu hình thất bại.');
        }
    });

    yield takeLatest(saveNotificationSuccess, function* () {
        yield put(setErrorNotification(errorNotification));
        handleNotification('success', 'Cấu hình thành công.');
    });

    yield takeLatest(saveNotificationFail, function* () {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorNotification({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Cấu hình thất bại.');
        }
    });
}

export default function* configSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}