import {useDispatch, useSelector} from 'react-redux';
import {setDataFilter} from '@/states/modules/project';
import {useNavigate} from 'react-router-dom';
import {getSecretKey} from '@/api/secretKey';

export default function Handle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataFilter = useSelector((state) => state.secretKey.dataFilter);

    const handleChangeTableKey = (pagination, filters, sorter) => {
        const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
        const column = sortOrder ? sorter.field : null;
        dispatch(
            setDataFilter({
                ...dataFilter,
                sort_order: sortOrder,
                column
            })
        );
        dispatch(getSecretKey());
    };

    return {
        handleChangeTableKey
    };
}
