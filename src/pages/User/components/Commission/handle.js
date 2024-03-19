import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {
    setActiveCommission,
    setDataFilterUsers,
    setListCommission,
    setListHistories
} from '@/states/modules/commission';
import _ from 'lodash';
import {requestGetListUserByRelationship} from '@/api/users';
import {requestGetListCommission} from '@/api/commissions';

export default function Handle() {
    const dispatch = useDispatch();
    const slideRef = useRef();
    const [isEndOfSlide, setIsEndOfSlide] = useState(false);
    const [isStartOfSlide, setIsStartOfSlide] = useState(false);
    const selectLimit = [10, 20, 50];
    const paginationListHistories = useSelector((state) => state.commission.paginationListHistories);
    const commissions = useSelector((state) => state.commission.commissions);
    const dataListUser = useSelector((state) => state.commission.listUser);
    const isLoadingGetListUser = useSelector((state) => state.commission.isLoadingGetListUser);
    const dataFilterUsers = useSelector((state) => state.commission.dataFilterUsers);
    const [visibleHistory, setVisibleHistory] = useState(false);

    useEffect(() => {
        const enableSlide = () => {
            if (slideRef?.current) {
                setIsEndOfSlide(
                    Math.abs(
                        slideRef.current.scrollLeft - (slideRef.current.scrollWidth - slideRef.current.clientWidth)
                    ) < 10
                );
                setIsStartOfSlide(slideRef.current.scrollLeft === 0);
            }
        };

        enableSlide();

        const onSlide = () => {
            enableSlide();
        };

        slideRef?.current?.addEventListener('scroll', onSlide);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            slideRef?.current?.removeEventListener('scroll', onSlide);
        };
    }, []);

    /* Handle */
    const handleSlide = (direction) => {
        if (slideRef?.current) {
            const scrollAmount = slideRef.current.clientWidth - 50;

            if (direction === 'next' && !isEndOfSlide) {
                slideRef.current.scrollLeft += scrollAmount;
            } else if (direction === 'back') {
                slideRef.current.scrollLeft -= scrollAmount;
            }
        }
    };

    const handleChangeInput = (e) => {
        const cloneDataFilterUsers = _.cloneDeep(dataFilterUsers);
        dispatch(setDataFilterUsers({...cloneDataFilterUsers, keySearch: e.target.value}));
        if (e.target.value === '') {
            dispatch(requestGetListUserByRelationship());
        }
    };

    const handleSearchUser = ({key}) => {
        if (key === 'Enter') {
            dispatch(requestGetListUserByRelationship());
        }
    };

    const handleClickUser = () => {
        dispatch(setActiveCommission({}));
        dispatch(setListCommission([]));
        dispatch(setListHistories([]));
        dispatch(requestGetListCommission());
        setVisibleHistory(true);
    };

    return {
        visibleHistory,
        isEndOfSlide,
        isStartOfSlide,
        slideRef,
        selectLimit,
        paginationListHistories,
        commissions,
        dataListUser,
        isLoadingGetListUser,
        dataFilterUsers,
        handleSearchUser,
        handleChangeInput,
        handleClickUser,
        handleSlide,
        dispatch
    };
}
