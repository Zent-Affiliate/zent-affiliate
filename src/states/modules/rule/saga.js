import {setBreadcrumb, setTitlePage} from '@/states/modules/app/index.js';
import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {handleNotification, isRouteActive} from '@/utils/helper.js';
import {
    createRuleFail,
    createRuleSuccessfully, deleteRuleFail, deleteRuleSuccessfully, setActiveConfig,
    setErrorCreateOrUpdate, setVisibleConfirmDelete,
    setVisibleModalCreateOrUpdate, setVisibleModalDelete, updateRuleFail, updateRuleSuccessfully
} from '@/states/modules/rule/index.js';
import {requestGetListRules} from '@/api/rule/index.js';
import _ from 'lodash';
import {requestGetProjectDetail} from '@/api/projectDetail/index.js';
import {getProjectDetailSuccess} from '@/states/modules/projectDetail/index.js';

function* loadRouteData() {
    yield put(setTitlePage('Rule Config'));
    yield put(requestGetProjectDetail());
    yield put(requestGetListRules());
    const location = yield select(state => state.app.location);

    if (isRouteActive('/my-project-detail/:project_id/rule-config')) {
        yield put(setTitlePage(`Rule Config`));
        yield put(setBreadcrumb([
            {
                path: '/my-project',
                name: 'My Project'
            },
            {
                path: `/my-project-detail/${location.params.project_id}/rule-config`,
                name: 'Rule Config'
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
    yield takeLatest(getProjectDetailSuccess, function* (action) {
        const project = action.payload.data;
        if (isRouteActive('my-project-detail/:project_id/rule-config')) {
            yield put(setTitlePage(`Project - ${project.name}`));
            yield put(setBreadcrumb([
                {
                    path: '/my-project',
                    name: 'My Project'
                },
                {
                    path: `/my-project-detail/${project._id}/rule-config`,
                    name: 'Rule Config'
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
        yield put(setActiveConfig(null));
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

export default function* ruleSaga() {
    yield all([fork(loadRouteData), fork(handleActions)]);
}