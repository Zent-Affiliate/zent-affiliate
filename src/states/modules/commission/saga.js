import {all, fork, put, select} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {isRouteActive} from '@/utils/helper.js';

function* loadRouteData() {
    const location = yield select(state => state.app.location)

    if (isRouteActive('/my-project-detail/:project_id/users/:id')) {
        yield put(setTitlePage('Danh sách khách hàng'));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My Project'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/users`,
                name: 'List of customers'
            },
            {
                path: '/my-project-detail/${location.params.project_id}/users/:id',
                name: 'Transaction history'
            }
        ]));
    } else {
        yield put(setTitlePage(`Project management`));
        yield put(setBreadcrumb([
            {
                path: '/admin-management',
                name: 'Admin Management'
            }
        ]));
    }
}

function* handleActions() {

}

export default function* commissionSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}