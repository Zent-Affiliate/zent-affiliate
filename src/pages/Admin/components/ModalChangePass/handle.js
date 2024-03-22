import { setDataChangePassAdmin, setErrorDataChangePassAdmin } from '@/states/modules/admin';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';

export default function Handle() {
    const dispatch = useDispatch();
    const dataChangePassAdmin = useSelector((state) => state.admin.dataChangePassAdmin);
    const errorDataChangePassAdmin = useSelector((state) => state.admin.errorDataChangePassAdmin);

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataChangePassAdmin);
        let dataError = _.cloneDeep(errorDataChangePassAdmin);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataChangePassAdmin(data));
        dispatch(setErrorDataChangePassAdmin(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorDataChangePassAdmin);
        dataError[type] = '';
        dispatch(setErrorDataChangePassAdmin(dataError));
    };

    return {
        handleChangeInputInfo,
        handleFocus
    };
}
