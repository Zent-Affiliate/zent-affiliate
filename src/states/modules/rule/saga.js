import {setBreadcrumb, setTitlePage} from '@/states/modules/app/index.js';
import {all, fork, put, select} from 'redux-saga/effects';
import {isRouteActive} from '@/utils/helper.js';

function* loadRouteData() {
    yield put(setTitlePage('Cấu hình trả thưởng'));
    const location = yield select(state => state.app.location)

    if (isRouteActive('/my-project-detail/:project_id/rule-config')) {
        yield put(setTitlePage(`Cấu hình trả thưởng`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'Dự án của tôi'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/rule-config`,
                name: 'Cấu hình trả thưởng'
            },
        ]));
    } else {
        yield put(setTitlePage(`Quản lý dự án`));
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

export default function* ruleSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}