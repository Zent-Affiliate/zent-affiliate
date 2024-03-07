import {setDataChangePassUser, setErrorDataChangePassUser} from '@/states/modules/user';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';

export default function Handle() {
    const dispatch = useDispatch();
    const dataChangePassUser = useSelector((state) => state.user.dataChangePassUser);
    const errorDataChangePassUser = useSelector((state) => state.user.errorDataChangePassUser);

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataChangePassUser);
        let dataError = _.cloneDeep(errorDataChangePassUser);
        data[type] = value;
        dataError[type] = '';
        dispatch(setDataChangePassUser(data));
        dispatch(setErrorDataChangePassUser(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorDataChangePassUser);
        dataError[type] = '';
        dispatch(setErrorDataChangePassUser(dataError));
    };

    return {
        handleChangeInputInfo,
        handleFocus
    };
}
