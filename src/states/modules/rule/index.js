import {createSlice} from '@reduxjs/toolkit';
import {RULE_CONFIG} from '@/utils/constants.js';

export const initialState = {
    rule: {
        code: '',
        name: '',
        configs: [
            {
                type: RULE_CONFIG.PERCENT,
                value: null
            }
        ]
    },
    errorCreateOrUpdate: {
        code: '',
        name: '',
        configs: ''
    }
};

const ruleSlice = createSlice({
    name: 'rule',
    initialState: {
        dataFilter: {
            keySearch: '',
            perPage: 20,
            page: 1,
            sort_order: 'desc',
            column: 'created_at'
        },
        isLoadingGetRule: false,
        isLoadingBtnCreateRule: false,
        isLoadingBtnUpdateRule: false,
        isLoadingBtnDeleteRule: false,
        isLoadingBtnDeleteConfig: false,

        isCreateRule: false,
        visibleModalCreateOrUpdate: false,
        visibleModalDelete: false,
        visibleConfirmDelete: false,

        rule: '',
        errorCreateOrUpdate: {
            code: '',
            name: '',
            configs: []
        },

        rules: [],
        paginationListRules: {
            totalRecord: '',
            currentPage: '',
            perPage: ''
        },

        configIndex: null
    },
    reducers: {
        setIsCreateRule: (state, action) => ({
            ...state,
            isCreateRule: action.payload
        }),
        setVisibleModalCreateOrUpdate: (state, action) => ({
            ...state,
            visibleModalCreateOrUpdate: action.payload
        }),
        setVisibleModalDelete: (state, action) => ({
            ...state,
            visibleModalDelete: action.payload
        }),
        setErrorCreateOrUpdate: (state, action) => ({
            ...state,
            errorCreateOrUpdate: action.payload
        }),
        setRule: (state, action) => ({
            ...state,
            rule: action.payload
        }),
        setRulesList: (state, action) => ({
            ...state,
            rules: action.payload
        }),
        getRules: (state) => ({
            ...state,
            isLoadingGetRule: true
        }),
        getRulesSuccessfully: (state, action) => ({
            ...state,
            isLoadingGetRule: false,
            rules: action.payload.data.rules,
            paginationListRules: {
                totalRecord: action.payload.data.total,
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page
            }
        }),
        getRulesFail: (state) => ({
            ...state,
            isLoadingGetRule: false,
            rules: []
        }),
        createRule: (state) => ({
            ...state,
            isLoadingBtnCreateRule: true
        }),
        createRuleSuccessfully: (state) => ({
            ...state,
            isLoadingBtnCreateRule: false
        }),
        createRuleFail: (state) => ({
            ...state,
            isLoadingBtnCreateRule: false
        }),
        updateRule: (state) => ({
            ...state,
            isLoadingBtnUpdateRule: true,
            isLoadingBtnDeleteConfig: true
        }),
        updateRuleSuccessfully: (state) => ({
            ...state,
            isLoadingBtnUpdateRule: false,
            isLoadingBtnDeleteConfig: false
        }),
        updateRuleFail: (state) => ({
            ...state,
            isLoadingBtnUpdateRule: false,
            isLoadingBtnDeleteConfig: false
        }),
        deleteRule: (state) => ({
            ...state,
            isLoadingBtnDeleteRule: true
        }),
        deleteRuleSuccessfully: (state) => ({
            ...state,
            isLoadingBtnDeleteRule: false
        }),
        deleteRuleFail: (state) => ({
            ...state,
            isLoadingBtnDeleteRule: false
        }),
        setVisibleConfirmDelete: (state, action) => ({
            ...state,
            visibleConfirmDelete: action.payload
        }),
        setConfigIndex: (state, action) => ({
            ...state,
            configIndex: action.payload
        }),
        setDataFilter: (state, action) => ({
            ...state,
            dataFilter: action.payload
        }),

        resetState: (state) => ({
            ...state,
            rule: initialState.rule,
            errorCreateOrUpdate: initialState.errorCreateOrUpdate
        })
    }
});

export const {
    getRules, getRulesSuccessfully, getRulesFail,
    setIsCreateRule,
    setVisibleModalCreateOrUpdate, setVisibleModalDelete,
    setRule, setRulesList,
    createRule, createRuleSuccessfully, createRuleFail,
    updateRule,
    updateRuleSuccessfully,
    updateRuleFail,
    deleteRule,
    deleteRuleSuccessfully,
    deleteRuleFail,
    setErrorCreateOrUpdate,
    setVisibleConfirmDelete,
    setConfigIndex,
    setDataFilter,
    resetState
} = ruleSlice.actions;

export default ruleSlice.reducer;