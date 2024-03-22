import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter} from '@/states/modules/rule';
import {
    resetState,
    setIsCreateRule,
    setVisibleConfirmDelete,
    setVisibleModalCreateOrUpdate,
    setVisibleModalDelete
} from '@/states/modules/rule/index.js';
import {isRouteActive} from '@/utils/helper.js';
import {requestGetListRules} from '@/api/rule/index.js';

export default function Handle() {
    const dispatch = useDispatch();
    const rule = useSelector(state => state.rule.rule);
    const rules = useSelector(state => state.rule.rules);
    const isCreateRule = useSelector(state => state.rule.isCreateRule);
    const visibleModalCreateOrUpdate = useSelector(state => state.rule.visibleModalCreateOrUpdate);
    const visibleModalDelete = useSelector(state => state.rule.visibleModalDelete);
    const activeRule = useSelector(state => state.rule.activeRule);
    const isLoadingGetRule = useSelector(state => state.rule.isLoadingGetRule);
    const isLoadingBtnDeleteRule = useSelector(state => state.rule.isLoadingBtnDeleteRule);
    const dataFilter = useSelector((state) => state.rule.dataFilter);
    const paginationListRules = useSelector((state) => state.rule.paginationListRules);
    const isLoadingBtnDeleteConfig = useSelector(state => state.rule.isLoadingBtnDeleteConfig);
    const visibleConfirmDelete = useSelector(state => state.rule.visibleConfirmDelete);
    const configIndex = useSelector(state => state.rule.configIndex);

    const isMyProjectDetail = isRouteActive('/my-project-detail/:project_id/rule-config');

    const handleShowModalCreateRule = () => {
        dispatch(resetState());
        dispatch(setIsCreateRule(true));
        dispatch(setVisibleModalCreateOrUpdate(true));
    };

    const handleCancelModalUpdateUser = () => {
        // dispatch(setVisibleModalUpdateUser(false));
    };

    const handleCancelModalDeleteRule = () => {
        dispatch(setVisibleModalDelete(false));
    };

    const handleSearchRule = (value) => {
        dispatch(setDataFilter({...dataFilter, keySearch: value}));
        if (!value) {
            dispatch(requestGetListRules());
        }
    };

    const handleEnterSearchRule = (event) => {
        if (event.key === 'Enter') {
            dispatch(requestGetListRules());
        }
    };

    const handleChangeSelectRule = (perPage) => {
        dispatch(setDataFilter({...paginationListRules, perPage, page: 1}));
        dispatch(requestGetListRules());
    };

    const handleCancelDeleteConfig = () => {
        dispatch(setVisibleConfirmDelete(false));
    };

    const handleSelectPagination = (event) => {
        dispatch(
            setDataFilter({
                ...dataFilter,
                page: event
            })
        );
        dispatch(requestGetListRules());
    };

    return {
        rule,
        rules,
        activeRule,
        isLoadingGetRule,
        isLoadingBtnDeleteRule,
        isCreateRule,
        visibleModalCreateOrUpdate,
        visibleModalDelete,
        isMyProjectDetail,
        isLoadingBtnDeleteConfig,
        visibleConfirmDelete,
        configIndex,
        dataFilter,
        paginationListRules,

        handleCancelModalUpdateUser,
        handleCancelModalDeleteRule,
        handleSearchRule,
        handleEnterSearchRule,
        handleShowModalCreateRule,
        handleCancelDeleteConfig,
        handleChangeSelectRule,
        handleSelectPagination
    };
}
