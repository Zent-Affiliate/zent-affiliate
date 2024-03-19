import {useDispatch, useSelector} from 'react-redux';
import {setActiveCommission, setListHistories} from '@/states/modules/commission/index.js';
import _ from 'lodash';
import { requestGetListHistory } from '@/api/commissions';

export default function Handle() {
    const dispatch = useDispatch();
    const activeCommission = useSelector(state => state.commission.activeCommission);
    const userActive = useSelector(state => state.commission.userActive);
    const commissions = useSelector(state => state.commission.commissions);

    const handleActiveCommission = (commission) => {
        dispatch(setListHistories([]))
        dispatch(setActiveCommission(commission));
        dispatch(requestGetListHistory());
    };

    return {
        commissions,
        userActive,
        activeCommission,

        handleActiveCommission
    };
}