import {useDispatch, useSelector} from 'react-redux';
import {RULE_CONFIG} from '@/utils/constants.js';
import store from '@/states/configureStore.js';
import {setRule} from '@/states/modules/rule/index.js';
import _ from 'lodash';

export default function Handle() {
    const rule = useSelector(state => state.rule.rule);
    const errorCreateOrUpdate = useSelector(state => state.rule.errorCreateOrUpdate);
    const dispatch = useDispatch();
    const typeSelection = [
        {
            label: 'Phần trăm (%)',
            value: RULE_CONFIG.PERCENT
        },
        {
            label: 'Cố định (VNĐ)',
            value: RULE_CONFIG.FIXED
        }
    ];

    const onChangeForm = (value, type, index) => {
        const rule = store.getState().rule.rule;
        let data = _.cloneDeep(rule);
        if (type === 'value') {
            data['configs'][index]['value'] = value;
        } else {
            data[type] = value;
        }

        dispatch(setRule(data));
    };

    const handleChangeSelectRuleType = (value, index) => {
        const rule = store.getState().rule.rule;
        let data = _.cloneDeep(rule);
        data['configs'][index]['type'] = value;

        dispatch(setRule(data));
    };

    const handleAddLevel = () => {
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
        const rule = store.getState().rule.rule;
        dispatch(setRule({
            ...rule,
            configs: rule.configs?.filter((_, index) => index !== indexToRemove)
        }));
    };

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return {
        rule,
        errorCreateOrUpdate,
        typeSelection,

        onChangeForm,
        handleChangeSelectRuleType,
        handleAddLevel,
        handleRemoveLevel,
        formatNumber
    };
}