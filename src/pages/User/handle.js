import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter} from '@/states/modules/user';
import {getListUsers} from '@/api/users';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);

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

    return {
        handleSearchUser,
        handleEnterSearchUser,
        handleChangeSelectUser
    };
}
