import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter} from '@/states/modules/user';
import {getListUsers} from '@/api/users';
import {validate} from '@/utils/validates';
import {TYPE_SUBMIT} from '@/utils/constants.js';
import {
    resetState,
    setIsCreateRule,
    setVisibleModalCreateOrUpdate,
    setVisibleModalDelete
} from '@/states/modules/rule/index.js';
import {isRouteActive} from '@/utils/helper.js';

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
    const paginationListUsers = useSelector((state) => state.rule.paginationListRules);

    const isMyProjectDetail = isRouteActive('/my-project-detail/:project_id/rule-config')

    const handleCancelModalCreateUser = () => {
        // dispatch(
        //     setErrorInfoUser({
        //         name: '',
        //         email: '',
        //         phone: '',
        //         avatar: '',
        //         avatarUrl: '',
        //         password: ''
        //     })
        // );
        // dispatch(
        //     setInfoUser({
        //         name: '',
        //         email: '',
        //         phone: '',
        //         avatar: '',
        //         password: ''
        //     })
        // );
        // dispatch(setVisibleModalCreateUser(false));
    };

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
            dispatch(getListUsers());
        }
    };

    const handleEnterSearchUser = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListUsers());
        }
    };

    const handleChangeSelectUser = (perPage) => {
        dispatch(setDataFilter({...paginationListUsers, perPage, page: 1}));
        dispatch(getListUsers());
    };

    // const handleChangeInputInfo = (valueInput, type) => {
    //     let value = valueInput.target.value;
    //     let data = _.cloneDeep(infoUser);
    //     let dataError = _.cloneDeep(errorInfoUser);
    //     data[type] = value;
    //     dataError[type] = '';
    //     dispatch(setInfoUser(data));
    //     dispatch(setErrorInfoUser(dataError));
    // };

    // const handleFocus = (type) => {
    //     let dataError = _.cloneDeep(errorInfoUser);
    //     dataError[type] = '';
    //     dispatch(setErrorInfoUser(dataError));
    // };

    const handleSubmit = (type, scheme, dataUser) => {
        // if (type === TYPE_SUBMIT.CREATE) {
        //     validate(scheme, dataUser, {
        //         onSuccess: (data) => dispatch(handleCreateUser(data)),
        //         onError: (error) => dispatch(setErrorInfoUser(error))
        //     });
        // }
        //
        // if (type === TYPE_SUBMIT.UPDATE) {
        //     validate(scheme, dataUser, {
        //         onSuccess: (data) => dispatch(handleUpdateUser(data._id, data)),
        //         onError: (error) => dispatch(setErrorInfoUser(error))
        //     });
        // }
        //
        // if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
        //     validate(scheme, dataUser, {
        //         onSuccess: (data) => dispatch(handleChangePassUser(data._id, data)),
        //         onError: (error) => dispatch(setErrorDataChangePassUser(error))
        //     });
        // }
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

        handleCancelModalCreateUser,
        handleCancelModalUpdateUser,
        handleCancelModalDeleteRule,
        handleSearchRule,
        handleEnterSearchUser,
        handleChangeSelectUser,
        handleShowModalCreateRule,
        handleSubmit
        // handleChangeInputInfo,
        // handleFocus,
    };
}
