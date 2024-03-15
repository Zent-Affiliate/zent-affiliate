import {useDispatch, useSelector} from 'react-redux';
import {RULE_CONFIG} from '@/utils/constants.js';
import store from '@/states/configureStore.js';
import {initialState, setErrorCreateOrUpdate, setRule} from '@/states/modules/rule/index.js';
import _ from 'lodash';
import {validate} from '@/utils/validates/index.js';
import {createOrUpdateRuleSchema} from '@/pages/Rule/schema.js';
import {requestCreateRule, requestUpdateRule} from '@/api/rule/index.js';

export default function Handle() {
    const rule = useSelector(state => state.rule.rule);
    const errorCreateOrUpdate = useSelector(state => state.rule.errorCreateOrUpdate);
    const isLoadingBtnCreateRule = useSelector(state => state.rule.isLoadingBtnCreateRule);
    const isLoadingBtnUpdateRule = useSelector(state => state.rule.isLoadingBtnUpdateRule);
    const dispatch = useDispatch();
    const typeSelection = [
        {
            label: 'Percent',
            value: RULE_CONFIG.PERCENT
        },
        {
            label: 'Fixed',
            value: RULE_CONFIG.FIXED
        }
    ];

    const onChangeForm = (value, type, index) => {
        const rule = store.getState().rule.rule;
        dispatch(setErrorCreateOrUpdate(initialState.errorCreateOrUpdate));

        let data = _.cloneDeep(rule);
        if (type === 'value') {
            data['configs'][index]['value'] = value;
        } else {
            data[type] = value;
        }

        dispatch(setRule(data));
    };

    const handleChangeSelectRuleType = (value, index) => {
        dispatch(setErrorCreateOrUpdate(initialState.errorCreateOrUpdate));
        const rule = store.getState().rule.rule;
        let data = _.cloneDeep(rule);
        data['configs'][index]['type'] = value;

        dispatch(setRule(data));
    };

    const handleAddLevel = () => {
        dispatch(setErrorCreateOrUpdate(initialState.errorCreateOrUpdate));
        const rule = store.getState().rule.rule;
        const newRuleConfig = {
            value: null,
            type: RULE_CONFIG.PERCENT
        };

        dispatch(setRule({
            ...rule,
            configs: [
                ...rule.configs,
                newRuleConfig
            ]
        }));
    };

    const handleRemoveLevel = (indexToRemove) => {
        dispatch(setErrorCreateOrUpdate(initialState.errorCreateOrUpdate));
        const rule = store.getState().rule.rule;
        dispatch(setRule({
            ...rule,
            configs: rule.configs?.filter((_, index) => index !== indexToRemove)
        }));
    };

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleSubmitForm = (isCreate) => {
        const rule = store.getState().rule.rule;

        validate(createOrUpdateRuleSchema, rule, {
            onSuccess: () => {
                if (isCreate) {
                    dispatch(requestCreateRule(rule));
                } else {
                    dispatch(requestUpdateRule(rule._id, _.omit(rule, '_id')));
                }
            },
            onError: (err) => {
                dispatch(setErrorCreateOrUpdate({
                    ...errorCreateOrUpdate,
                    ...err
                }));
            }
        });
    };

    return {
        rule,
        errorCreateOrUpdate,
        typeSelection,
        isLoadingBtnCreateRule,
        isLoadingBtnUpdateRule,

        onChangeForm,
        handleChangeSelectRuleType,
        handleAddLevel,
        handleRemoveLevel,
        formatNumber,
        handleSubmitForm
    };
}