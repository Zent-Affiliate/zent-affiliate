import {all, fork, put, takeLatest} from 'redux-saga/effects';
import {
    requestChangePasswordFail,
    requestChangePasswordSuccess,
    setDataChangePassword,
    setErrorChangePassword,
    setErrorInformation,
    startRequestUpdateInformationFail,
    startRequestUpdateInformationSuccess
} from './index.js';
import {handleNotification} from '@/utils/helper.js';
import _ from 'lodash';
import {getMe} from '@/api/auth/index.js';

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(startRequestUpdateInformationSuccess, function* () {
        handleNotification('success', 'Successfully updated.');
        yield put(getMe());
    });

    yield takeLatest(startRequestUpdateInformationFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorInformation({
                name: _.get(errors, 'name', ''),
                email: _.get(errors, 'email', ''),
                phone: _.get(errors, 'phone', ''),
                avatar: _.get(errors, 'avatar', '')
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            handleNotification('error', (message ? message : 'Invalid information.'));
        } else {
            handleNotification('error', 'An error occurred, please try again later.');
        }
    });

    yield takeLatest(requestChangePasswordSuccess, function* () {
        handleNotification('success', 'Password changed successfully.');
        yield put(setDataChangePassword({
            currentPassword: '',
            password: '',
            confirmPassword: ''
        }));
    });

    yield takeLatest(requestChangePasswordFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorChangePassword({
                password: _.get(errors, 'password', ''),
                newPassword: _.get(errors, 'new_password', ''),
                confirmPassword: _.get(errors, 'confirm_password', '')
            }));
        } else if (statusError === 401) {
            const message = action.payload.data.message;
            const errors = action.payload.data.error;
            if (errors) {
                yield put(setErrorChangePassword({
                    currentPassword: _.get(errors, 'current_password', ''),
                    password: _.get(errors, 'password', ''),
                    confirmPassword: _.get(errors, 'confirm_password', '')
                }));
            } else {
                handleNotification('error', (message ? message : 'Invalid information.'));
            }
        } else {
            handleNotification('error', 'An error occurred, please try again later.');
        }
    });
}

export default function* loadProfileSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
