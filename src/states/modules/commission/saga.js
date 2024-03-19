import {all, fork, put, select} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {isRouteActive} from '@/utils/helper.js';
import { requestGetListUserByRelationship } from '@/api/users';

function* loadRouteData() {
    const location = yield select(state => state.app.location)

    yield put(requestGetListUserByRelationship())

    if (isRouteActive('/my-project-detail/:project_id/users/:id')) {
        yield put(setTitlePage('List User'));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My project'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/users`,
                name: 'List User'
            },
            {
                path: '/my-project-detail/${location.params.project_id}/users/:id',
                name: 'Transaction History'
            }
        ]));
    } else {
        yield put(setTitlePage(`Project Management`));
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