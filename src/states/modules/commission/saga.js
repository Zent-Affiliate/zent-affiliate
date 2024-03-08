import {all, fork, put} from 'redux-saga/effects';
import {setTitlePage} from '../app';

function* loadRouteData() {
    yield put(setTitlePage('Danh sách khách hàng'));
}

function* handleActions() {

}

export default function* commissionSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}