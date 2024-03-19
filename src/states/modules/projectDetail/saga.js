import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {setBreadcrumb, setTitlePage} from '../app';
import {handleNotification, isRouteActive} from '@/utils/helper';
import {getProjectDetailSuccess} from '.';
import {requestGetListRules} from '@/api/rule/index.js';
import {
    createRuleFail,
    createRuleSuccessfully,
    deleteRuleFail,
    deleteRuleSuccessfully,
    setErrorCreateOrUpdate,
    setVisibleConfirmDelete,
    setVisibleModalCreateOrUpdate,
    setVisibleModalDelete,
    updateRuleFail,
    updateRuleSuccessfully
} from '@/states/modules/rule/index.js';
import _ from 'lodash';
import {requestGetProjectDetail} from '@/api/projectDetail';
import {requestGetListUser} from '@/api/users/index.js';

function* loadRouteData() {
    const {app} = yield select();
    yield put(requestGetProjectDetail());
    yield put(requestGetListUser());
    yield put(requestGetListRules());

    if (isRouteActive('my-project-detail/:project_id')) {
        yield put(setTitlePage(`Project`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My Project'
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
    yield takeLatest(getProjectDetailSuccess, function* (action) {
        const project = action.payload.data;
        if (isRouteActive('my-project-detail/:project_id')) {
            yield put(setTitlePage(`Project - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/my-project',
                    name: 'My Project'
                },
                {
                    path: `/my-project-detail/${project._id}`,
                    name: project.name
                }
            ]));
        } else {
            yield put(setTitlePage(`Project - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/admin-management',
                    name: 'Admin Management'
                },
                {
                    path: `/${project.admin._id}/projects`,
                    name: 'List project'
                },
                {
                    path: `/project-detail/${project._id}`,
                    name: project.name
                }
            ]));
        }
    });

    yield takeLatest(createRuleSuccessfully, function* () {
        handleNotification('success', 'Create rule successfully');
        yield put(requestGetListRules());
        yield put(setVisibleModalCreateOrUpdate(false));
    });

    yield takeLatest(createRuleFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorCreateOrUpdate({
                code: _.get(errors, 'code', '')
            }));
        } else {
            handleNotification('error', 'Please try again later.');
        }
    });

    yield takeLatest(updateRuleSuccessfully, function* () {
        handleNotification('success', 'Update rule successfully');
        yield put(requestGetListRules());
        yield put(setVisibleModalCreateOrUpdate(false));
        yield put(setVisibleConfirmDelete(false));
    });

    yield takeLatest(updateRuleFail, function* (action) {
        let statusError = action.payload.status;
        if (statusError === 400) {
            let errors = action.payload.data.detail;
            yield put(setErrorCreateOrUpdate({
                code: _.get(errors, 'code', '')
            }));
        } else {
            handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

    yield takeLatest(deleteRuleSuccessfully, function* () {
        handleNotification('success', 'Delete rule successfully');
        yield put(requestGetListRules());
        yield put(setVisibleModalDelete(false));
    });

    yield takeLatest(deleteRuleFail, function() {
        handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    });

}

export default function* projectDetailSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
