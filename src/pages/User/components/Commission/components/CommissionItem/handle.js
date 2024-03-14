import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveCommission} from '@/states/modules/commission/index.js';
import _ from 'lodash';

export default function Handle() {
    const dispatch = useDispatch();
    const activeCommission = useSelector(state => state.commission.activeCommission);
    const commissions = useSelector(state => state.commission.commissions);

    useEffect(() => {
        if (commissions?.length > 0 && _.isEmpty(activeCommission)) {
            dispatch(setActiveCommission(commissions[0]));
        }
    }, []);

    const handleActiveCommission = (commission) => {
        dispatch(setActiveCommission(commission));
    };

    return {
        activeCommission,

        handleActiveCommission
    };
}