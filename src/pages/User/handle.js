import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {
    setDataChangePassUser,
    setDataFilter,
    setErrorDataChangePassUser,
    setErrorInfoUser,
    setInfoUser,
    setVisibleModalChangePass,
    setVisibleModalCreateUser,
    setVisibleModalDeleteUser,
    setVisibleModalUpdateUser
} from '@/states/modules/user';
import {getListUsers, handleChangePassUser, handleCreateUser, handleUpdateUser} from '@/api/users';
import {validate} from '@/utils/validates';
import {ACTIVE_STATUS, TYPE_FILE, TYPE_SUBMIT} from '@/utils/constants.js';
import {handleNotification} from '@/utils/helper';
import _ from 'lodash';

export default function Handle() {
    const dispatch = useDispatch();
    const infoUser = useSelector((state) => state.user.infoUser);
    const errorInfoUser = useSelector((state) => state.user.errorInfoUser);
    const dataFilter = useSelector((state) => state.user.dataFilter);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);

    const handleCancelModalCreateUser = () => {
        dispatch(
            setErrorInfoUser({
                name: '',
                email: '',
                phone: '',
                avatar: '',
                avatarUrl: '',
                password: ''
            })
        );
        dispatch(
            setInfoUser({
                name: '',
                email: '',
                phone: '',
                avatar: '',
                password: ''
            })
        );
        dispatch(setVisibleModalCreateUser(false));
    };

    const handleShowModalCreateUser = () => {
        dispatch(
            setInfoUser({
                name: '',
                email: '',
                phone: '',
                avatar: '',
                password: ''
            })
        );
        dispatch(setVisibleModalCreateUser(true));
    };

    const handleCancelModalUpdateUser = () => {
        dispatch(setVisibleModalUpdateUser(false));
    };

    const handleCancelModalDeleteUser = () => {
        dispatch(setVisibleModalDeleteUser(false));
    };

    const handleCancelModalChangePass = () => {
        dispatch(
            setDataChangePassUser({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(
            setErrorDataChangePassUser({
                new_password: '',
                confirm_password: ''
            })
        );
        dispatch(setVisibleModalChangePass(false));
    };

    const handleSearchUser = (value) => {
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

    const handleChangeAvatar = (file) => {
        if (file.target.files[0]) {
            let currentFile = file.target.files[0];
            let fileUrl = URL.createObjectURL(file.target.files[0]);
            let dataError = '';
            if (currentFile.size / 1024 / 1024 > 2.048) {
                dataError = 'Kích thước ảnh không được vượt quá 2MB.';
            } else if (!TYPE_FILE.includes(currentFile.type)) {
                dataError = 'Ảnh đại diện chỉ được hỗ trợ kiểu jpg,jpeg,png,svg,webp.';
            }

            if (dataError) {
                handleNotification('error', dataError);
            } else {
                let dataCloneDeep = _.cloneDeep(infoUser);
                dataCloneDeep['avatar'] = currentFile;
                dataCloneDeep['avatarUrl'] = fileUrl;
                dispatch(setInfoUser(dataCloneDeep));
            }
        }
    };

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(infoUser);
        let dataError = _.cloneDeep(errorInfoUser);
        data[type] = value;
        dataError[type] = '';
        dispatch(setInfoUser(data));
        dispatch(setErrorInfoUser(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorInfoUser);
        dataError[type] = '';
        dispatch(setErrorInfoUser(dataError));
    };

    const handleSubmit = (type, scheme, dataUser) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(scheme, dataUser, {
                onSuccess: (data) => dispatch(handleCreateUser(data)),
                onError: (error) => dispatch(setErrorInfoUser(error))
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(scheme, dataUser, {
                onSuccess: (data) => dispatch(handleUpdateUser(data._id, data)),
                onError: (error) => dispatch(setErrorInfoUser(error))
            });
        }

        if (type === TYPE_SUBMIT.CHANGE_PASSWORD) {
            validate(scheme, dataUser, {
                onSuccess: (data) => dispatch(handleChangePassUser(data._id, data)),
                onError: (error) => dispatch(setErrorDataChangePassUser(error))
            });
        }
    };

    const handleSwitchChange = (checked) => {
        const switchIndex = checked ? ACTIVE_STATUS.UNLOCK : ACTIVE_STATUS.LOCK;
        dispatch(setInfoUser({...infoUser, status: switchIndex}));
    };

    return {
        handleCancelModalCreateUser,
        handleCancelModalUpdateUser,
        handleCancelModalDeleteUser,
        handleCancelModalChangePass,
        handleSearchUser,
        handleEnterSearchUser,
        handleChangeSelectUser,
        handleShowModalCreateUser,
        handleSubmit,
        handleSwitchChange,
        handleChangeAvatar,
        handleChangeInputInfo,
        handleFocus
    };
}
