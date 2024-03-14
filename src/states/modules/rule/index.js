import {createSlice} from '@reduxjs/toolkit';
import {RULE_CONFIG} from '@/utils/constants.js';

const initialState = {
    rule: {
        code: '',
        name: '',
        configs: [
            {
                level: 0,
                type: RULE_CONFIG.PERCENT,
                value: null
            }
        ]
    },
    errorCreateOrUpdate: {
        code: '',
        name: '',
        configs: []
    }
};

const ruleSlice = createSlice({
    name: 'rule',
    initialState: {
        isLoadingGetRule: false,
        isLoadingBtnCreateRule: false,
        isLoadingBtnUpdateRule: false,
        isLoadingBtnDeleteRule: false,

        isCreateRule: false,
        visibleModalCreateOrUpdate: false,
        visibleModalDelete: false,

        rule: '',
        errorCreateOrUpdate: {
            code: '',
            name: '',
            configs: []
        },

        rules: [
            {
                _id: '1',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '11',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '12',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '13',
                        value: 111111111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }

                ]
            },
            {
                _id: '2',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '21',
                        value: 111111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '22',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '23',
                        value: 111111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }

                ]
            },
            {
                _id: '3',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '31',
                        value: 1111111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    }

                ]
            },
            {
                _id: '4',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '41',
                        value: 111111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '42',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '43',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }

                ]
            },
            {
                _id: '5',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '51',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '52',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '53',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }

                ]
            },
            {
                _id: '6',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '61',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    }

                ]
            },
            {
                _id: '7',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '71',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '72',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '73',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }

                ]
            },
            {
                _id: '8',
                code: 'asdasd',
                name: 'Adasdq',
                configs: [
                    {
                        _id: '81',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 3
                    },
                    {
                        _id: '82',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '83',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    },
                    {
                        _id: '84',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '85',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    },
                    {
                        _id: '86',
                        value: 15,
                        type: RULE_CONFIG.PERCENT,
                        level: 1
                    },
                    {
                        _id: '87',
                        value: 111,
                        type: RULE_CONFIG.FIXED,
                        level: 2
                    }
                ]
            }
        ],
        dataFilter: {},
        paginationListRules: {}
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
            rules: action.payload
        }),
        getRulesFail: (state) => ({
            ...state,
            isLoadingGetRule: false,
            rules: []
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
    resetState
} = ruleSlice.actions;

export default ruleSlice.reducer;