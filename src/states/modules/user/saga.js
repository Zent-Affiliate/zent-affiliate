import {all, fork, put} from 'redux-saga/effects';
import {setTitlePage} from '../app';
import {getListUsers} from '@/api/users';
import {setDataFilter} from '.';

function* loadRouteData() {
    yield put(setTitlePage('Danh sách khách hàng'));
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
}

export default function* userSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
