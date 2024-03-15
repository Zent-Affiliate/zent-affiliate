import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import app, {setBreadcrumb, setTitlePage} from '../app';
import {getListProjects} from '@/api/project';
import {
    createProjectFail,
    createProjectSuccess,
    deleteProjectFail,
    deleteProjectSuccess,
    setDataFilter,
    setErrorInfoProject,
    setVisibleModalCreateProject,
    setVisibleModalDeleteProject,
    setVisibleModalUpdateProject,
    updateProjectFail,
    updateProjectSuccess
} from '.';
import {handleNotification} from '@/utils/helper';

function* loadRouteData() {
    yield put(setTitlePage('My Project'));
    yield put(setDataFilter({
        keySearch: '',
        perPage: 20,
        page: 1,
        field: null,
        sortOrder: null,
        server: null,
        tags: [],
        status: null
    }));
    yield put(getListProjects());
    yield put(setBreadcrumb([
        {
            path: '/',
            name: 'Home'
        },
        {
            path: '/my-project',
            name: 'My Project'
        },
    ]))
}

function* handleActions() {

    yield takeLatest(createProjectSuccess, function* () {
        yield put(getListProjects());
        yield put(setVisibleModalCreateProject(false));
        handleNotification('success', 'Created a new project successfully.');
    });

    yield takeLatest(createProjectFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoProject({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Creating a new project failed.');
        }
    });

    yield takeLatest(updateProjectSuccess, function* () {
        yield put(getListProjects());
        yield put(setVisibleModalUpdateProject(false));
        handleNotification('success', 'Project updated successfully.');
    });

    yield takeLatest(updateProjectFail, function* (action) {
        let status = action.payload.status;
        if (status === 400) {
            let errors = action.payload.data.detail;
            yield put(
                setErrorInfoProject({
                    ...errors
                })
            );
        } else {
            handleNotification('error', 'Project update failed.');
        }
    });

    yield takeLatest(deleteProjectSuccess, function* () {
        handleNotification('success', 'Project deleted successfully.');
        yield put(setVisibleModalDeleteProject(false));
        yield put(getListProjects());
    });

    yield takeLatest(deleteProjectFail, function* () {
        yield call(handleNotification, 'error', 'Delete failed project.');
    });

}

export default function* projectSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}