import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {requestGetListUser} from '@/api/users';
import {setDataFilter} from '.';
import {isRouteActive} from '@/utils/helper.js';
import {getProjectDetailSuccess} from '@/states/modules/projectDetail/index.js';
import {requestGetProjectDetail} from '@/api/projectDetail/index.js';

function* loadRouteData() {
    const location = yield select(state => state.app.location);
    yield put(requestGetProjectDetail());
    yield put(requestGetListUser());

    if (isRouteActive('/my-project-detail/:project_id/users')) {
        yield put(setTitlePage(`List User`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My Project'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/users`,
                name: 'List User'
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
}

function* handleActions() {
    yield takeLatest(getProjectDetailSuccess, function* (action) {
        const project = action.payload.data;
        if (isRouteActive('my-project-detail/:project_id/users')) {
            yield put(setTitlePage(`Project - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/my-project',
                    name: 'My Project'
                },
                {
                    path: `/my-project-detail/${project._id}/users`,
                    name: 'List User'
                }
            ]));
        }
    });
}

export default function* userSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}
