import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import { goToPage, setBreadcrumb, setTitlePage } from '../app';
import { hasPermission, isRouteActive } from '@/utils/helper';
import { requestGetProjectDetail } from '@/api/projectDetail';
import { getProjectDetailSuccess } from '.';

function* loadRouteData() {
    const { app } = yield select();
    yield put(requestGetProjectDetail())

    if(isRouteActive('my-project-detail/:project_id')){
        yield put(setTitlePage(`Dự án`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My Project'
            },
        ])) 
    }else{
        yield put(setTitlePage(`Quản lý dự án `));
        yield put(setBreadcrumb([
            {
                path: '/admin-management',
                name: 'Admin Management'
            }
        ])) 
    }

}

function* handleActions() {
    yield takeLatest(getProjectDetailSuccess, function* (action){
        const project = action.payload.data
        if(isRouteActive('my-project-detail/:project_id')){
            yield put(setTitlePage(`Dự án - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/my-project',
                    name: 'My Project'
                },
                {
                    path: `/my-project-detail/${project._id}`,
                    name: project.name
                },
            ]))
        }else{
            yield put(setTitlePage(`Quản lý dự án - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/admin-management',
                    name: 'Admin Management'
                },
                {
                    path: `/${project.admin._id}/projects`,
                    name: 'Danh sách dự án'
                },
                {
                    path: `/project-detail/${project._id}`,
                    name: project.name
                },
            ]))
        }
    })
}

export default function* projectDetailSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
