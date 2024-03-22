import { useDispatch, useSelector } from 'react-redux';
import './styles.module.scss';
import {
    setDataChangePassAdmin,
    setErrorDataChangePassAdmin,
    setVisibleModalChangePass,
    setErrorInfoAdmin,
    setInfoAdmin,
    setDataFilter,
    setVisibleModalCreateAdmin,
    setVisibleModalDeleteAdmin,
    setVisibleModalUpdateAdmin
} from '@/states/modules/admin';
import { getListAdmins, handleCreateAdmin, handleUpdateAdmin } from '@/api/admin';
import { validate } from '@/utils/validates';
import { handleNotification } from '@/utils/helper';
import _ from 'lodash';
import { TYPE_SUBMIT } from '@/utils/constants';
import {useEffect} from 'react';
import {setBreadcrumb} from '@/states/modules/app/index.js';

export default function Handle() {
    const dispatch = useDispatch();
    const infoAdmin = useSelector((state) => state.admin.infoAdmin);
    const errorInfoAdmin = useSelector((state) => state.admin.errorInfoAdmin);
    const dataFilter = useSelector((state) => state.admin.dataFilter);
    const paginationListAdmins = useSelector((state) => state.admin.paginationListAdmins);

    const handleCancelModalCreateAdmin = () => {
        dispatch(
            setErrorInfoAdmin({
                name: '',
                email: '',
                password: ''
            })
        );

        dispatch(
            setInfoAdmin({
                name: '',
                email: '',
                password: ''
            })
        );
        dispatch(setVisibleModalCreateAdmin(false));
    };

    const handleShowModalCreateAdmin = () => {
        dispatch(
            setInfoAdmin({
                name: '',
                email: '',
                password: ''
            })
        );
        dispatch(setVisibleModalCreateAdmin(true))
    };

    const handleCancelModalUpdateAdmin = () => {
        dispatch(setVisibleModalUpdateAdmin(false))
    }

    const handleCancelModalDeleteAdmin = () => {
        dispatch(setVisibleModalDeleteAdmin(false));
    };

    const handleCancelModalChangePass = () => {
        dispatch(
            setDataChangePassAdmin({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(
            setErrorDataChangePassAdmin({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(setVisibleModalChangePass(false));
    };

    const handleSearchAdmin = (value) => {
        dispatch(setDataFilter({ ...dataFilter, keySearch: value }));
        if (!value) {
            dispatch(getListAdmins());
        }
    };

    const handleEnterSearchAdmin = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListAdmins());
        }
    };

    const handleChangeSelectAdmin = (perPage) => {
        dispatch(setDataFilter({ ...paginationListAdmins, perPage, page: 1 }));
        dispatch(getListAdmins());
    };

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(infoAdmin);
        let dataError = _.cloneDeep(errorInfoAdmin);
        data[type] = value;
        dataError[type] = '';
        dispatch(setInfoAdmin(data));
        dispatch(setErrorInfoAdmin(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorInfoAdmin);
        dataError[type] = '';
        dispatch(setErrorInfoAdmin(dataError));
    };

    const handleSubmit = (type, scheme, dataAdmin) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(scheme, dataAdmin, {
                onSuccess: (data) => dispatch(handleCreateAdmin(data)),
                onError: (error) => dispatch(setErrorInfoAdmin(error))
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(scheme, dataAdmin, {
                onSuccess: (data) => dispatch(handleUpdateAdmin(data._id, data)),
                onError: (error) => dispatch(setErrorInfoAdmin(error))
            });
        }
    };

    const handleSwitchChange = (checked) => {
        const switchIndex = checked ? ACTIVE_STATUS.UNLOCK : ACTIVE_STATUS.LOCK;
        dispatch(setInfoAdmin({ ...infoAdmin, status: switchIndex }));
    };

    return {
        handleCancelModalCreateAdmin,
        handleCancelModalDeleteAdmin,
        handleCancelModalUpdateAdmin,
        handleCancelModalChangePass,
        handleSearchAdmin,
        handleEnterSearchAdmin,
        handleChangeSelectAdmin,
        handleShowModalCreateAdmin,
        handleSubmit,
        handleSwitchChange,
        handleChangeInputInfo,
        handleFocus
    };
}