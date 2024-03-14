import {all, fork, put, select} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {getListUsers} from '@/api/users';
import {setDataFilter} from '.';
import {isRouteActive} from '@/utils/helper.js';

function* loadRouteData() {
    const location = yield select(state => state.app.location);

    if (isRouteActive('/my-project-detail/:project_id/users')) {
        yield put(setTitlePage(`Danh sách khách hàng`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'Dự án của tôi'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/users`,
                name: 'Danh sách khách hàng'
            }
        ]));
    } else {
        yield put(setTitlePage(`Admin Management`));
        yield put(setBreadcrumb([
            {
                path: '/admin-management',
                name: 'Admin Management'
            }
        ]));
    }
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
