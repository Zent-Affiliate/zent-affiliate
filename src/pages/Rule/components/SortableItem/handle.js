import {useDispatch} from 'react-redux';
import {setConfigIndex, setRule, setVisibleConfirmDelete} from '@/states/modules/rule/index.js';

export default function Handle() {
    const dispatch = useDispatch();

    const handleOpenConfirmDeleteConfig = (rule, index) => {
        dispatch(setRule(rule))
        dispatch(setConfigIndex(index))
        dispatch(setVisibleConfirmDelete(true));
    };

    return {
        handleOpenConfirmDeleteConfig
    };
}