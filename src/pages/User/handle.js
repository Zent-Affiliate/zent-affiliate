import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter} from '@/states/modules/user';
import {requestGetListUser} from '@/api/users';

export default function Handle() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);

    const handleSearchUser = (value) => {
        dispatch(setDataFilter({...dataFilter, keySearch: value}));
        if (!value) {
            dispatch(requestGetListUser());
        }
    };

    const handleEnterSearchUser = (event) => {
        if (event.key === 'Enter') {
            dispatch(requestGetListUser());
        }
    };

    const handleChangeSelectUser = (perPage) => {
        dispatch(setDataFilter({...paginationListUsers, perPage, page: 1}));
        dispatch(requestGetListUser());
    };

    return {
        handleSearchUser,
        handleEnterSearchUser,
        handleChangeSelectUser
    };
}
