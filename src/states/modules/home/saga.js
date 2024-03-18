import {all, fork, put} from 'redux-saga/effects';
import { goToPage, setBreadcrumb, setTitlePage } from '../app';
import { hasPermission } from '@/utils/helper';

function* loadRouteData() {
    yield put(setTitlePage('Home'));
    yield put(setBreadcrumb([
        {
            path: '/',
            name: 'Home'
        }
    ]))
    if(hasPermission(['super_admin'])){
        yield put(goToPage(
            {
                path: '/admin-management'
            }
        ))
    }else{
        yield put(goToPage(
            {
                path: '/my-project'
            }
        ))
    }
}

function* handleActions() {

}

export default function* homeSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
