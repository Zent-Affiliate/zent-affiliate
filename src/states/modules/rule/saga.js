import {setTitlePage} from '@/states/modules/app/index.js';
import {all, fork, put} from 'redux-saga/effects';

function* loadRouteData() {
    yield put(setTitlePage('Cấu hình trả thưởng'));
}

function* handleActions() {

}

export default function* ruleSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}