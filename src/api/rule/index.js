import callApi from '@/api/callApi';
import {
    createRule, createRuleFail,
    createRuleSuccessfully, deleteRule, deleteRuleFail, deleteRuleSuccessfully,
    getRules,
    getRulesFail,
    getRulesSuccessfully, updateRule, updateRuleFail, updateRuleSuccessfully
} from '@/states/modules/rule/index.js';

export const requestGetListRules = () => async (dispatch, getState) => {
    const projectId = getState().app.location.params.project_id
    const dataFilter = getState().rule.dataFilter;
    let path = `rules/${projectId}?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`;
    }

    if (dataFilter.sort_order) {
        path += `&sort_order=${dataFilter.sort_order}&field=${dataFilter.column}`;
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            getRules,
            getRulesSuccessfully,
            getRulesFail
        ],
        variables: {},
        dispatch,
        getState
    });
};

export const requestCreateRule = (data) => async(dispatch, getState) => {
    const projectId = getState().app.location.params.project_id

    return callApi({
        method: 'post',
        apiPath: `rules/${projectId}`,
        actionTypes: [
            createRule,
            createRuleSuccessfully,
            createRuleFail
        ],
        variables: data,
        dispatch,
        getState
    });
}

export const requestUpdateRule = (ruleId, data) => async(dispatch, getState) => {
    const projectId = getState().app.location.params.project_id

    return callApi({
        method: 'put',
        apiPath: `rules/${projectId}/${ruleId}`,
        actionTypes: [
            updateRule,
            updateRuleSuccessfully,
            updateRuleFail
        ],
        variables: data,
        dispatch,
        getState
    });
}

export const requestDeleteRule = (ruleId) => async(dispatch, getState) => {
    const projectId = getState().app.location.params.project_id

    return callApi({
        method: 'delete',
        apiPath: `rules/${projectId}/${ruleId}`,
        actionTypes: [
            deleteRule,
            deleteRuleSuccessfully,
            deleteRuleFail
        ],
        variables: {},
        dispatch,
        getState
    });
}
