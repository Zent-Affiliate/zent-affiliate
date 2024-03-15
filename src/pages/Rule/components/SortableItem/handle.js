import {useDispatch, useSelector} from 'react-redux';
import {setActiveConfig, setConfigIndex, setRule, setVisibleConfirmDelete} from '@/states/modules/rule/index.js';
import store from '@/states/configureStore.js';
import _ from 'lodash';
import {requestUpdateRule} from '@/api/rule/index.js';

export default function Handle() {
    const dispatch = useDispatch();
    const rule = useSelector(state => state.rule.rule);
    const activeConfig = useSelector(state => state.rule.activeConfig);

    const handleOpenConfirmDeleteConfig = (rule, index) => {
        dispatch(setRule(rule));
        dispatch(setConfigIndex(index));
        dispatch(setVisibleConfirmDelete(true));
    };

    const handleEnableEdit = (rule, config, index) => {
        dispatch(setRule(rule));
        dispatch(setActiveConfig(config));
        dispatch(setConfigIndex(index));
    };

    const handleUpdateConfig = () => {
        const configIndex = store.getState().rule.configIndex;
        const activeConfig = store.getState().rule.activeConfig;
        let cloneRule = _.cloneDeep(rule);
        if (activeConfig) {
            cloneRule.configs[configIndex] = activeConfig;
            dispatch(requestUpdateRule(rule._id, cloneRule));
        }
    };

    const handleCancelUpdate = () => {
        dispatch(setActiveConfig(null));
    };

    const handleChangeInCard = (value, type) => {
        let cloneClickedConfig = _.cloneDeep(activeConfig);
        cloneClickedConfig[type] = value;
        dispatch(setActiveConfig(cloneClickedConfig));
    };

    return {
        activeConfig,
        rule,
        handleOpenConfirmDeleteConfig,
        handleChangeInCard,
        handleEnableEdit,
        handleUpdateConfig,
        handleCancelUpdate
    };
}