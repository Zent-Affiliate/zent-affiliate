import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';

export default function Handle() {
    const slideRef = useRef();
    const [isEndOfSlide, setIsEndOfSlide] = useState(false);
    const [isStartOfSlide, setIsStartOfSlide] = useState(false);
    const selectLimit = [10, 20, 50];
    const paginationListHistories = useSelector(state => state.commission.paginationListHistories);
    const commissions = useSelector(state => state.commission.commissions);

    useEffect(() => {
        const enableSlide = () => {
            if (slideRef?.current) {
                setIsEndOfSlide(Math.abs(slideRef.current.scrollLeft - (slideRef.current.scrollWidth - slideRef.current.clientWidth)) < 10);
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

    return {
        isEndOfSlide, isStartOfSlide,
        slideRef, selectLimit, paginationListHistories, commissions, handleSlide
    };
}