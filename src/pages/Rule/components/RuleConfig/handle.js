import {useDispatch, useSelector} from 'react-redux';
import {
    resetState,
    setIsCreateRule,
    setRule,
    setRulesList, setVisibleConfirmDelete,
    setVisibleModalCreateOrUpdate,
    setVisibleModalDelete
} from '@/states/modules/rule/index.js';
import {arrayMove} from '@dnd-kit/sortable';
import store from '@/states/configureStore.js';
import _ from 'lodash';
import {requestUpdateRule} from '@/api/rule/index.js';

export default function Handle() {
    const dispatch = useDispatch();

    const handleDragEnd = (event, rule) => {
        const {active, over} = event;
        const rules = store.getState().rule.rules;
        let cloneRules = _.cloneDeep(rules);
        const ruleConfigs = rule.configs;

        if (ruleConfigs?.length > 0) {
            if (active.id._id !== over.id._id) {
                const oldIndex = ruleConfigs.findIndex(config => config._id === active.id._id);
                const newIndex = ruleConfigs.findIndex(config => config._id === over.id._id);
                const ruleIndex = cloneRules.findIndex(item => item._id === rule._id);

                cloneRules[ruleIndex] = {
                    ...rule,
                    configs: arrayMove(ruleConfigs, oldIndex, newIndex)
                };

                dispatch(setRulesList(cloneRules));
                dispatch(requestUpdateRule(rule._id, cloneRules[ruleIndex]));
            }
        }
    };

    const handleShowModalUpdateRule = (rule) => {
        dispatch(resetState());
        dispatch(setRule(rule));
        dispatch(setIsCreateRule(false));
        dispatch(setVisibleModalCreateOrUpdate(true));
    };

    const handleShowModalDeleteRule = (rule) => {
        dispatch(setRule(rule));
        dispatch(setVisibleModalDelete(rule));
    };

    return {
        handleDragEnd,
        handleShowModalUpdateRule,
        handleShowModalDeleteRule
    };
}