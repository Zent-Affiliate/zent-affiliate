import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';

export default function Handle() {
    const slideRef = useRef();
    const [isEndOfSlide, setIsEndOfSlide] = useState(false);
    const [isStartOfSlide, setIsStartOfSlide] = useState(false);
    const selectLimit = [10, 20, 50];
    const paginationListHistories = useSelector(state => state.commission.paginationListHistories);
    const data = [
        {
            total: 1000,
            referrer: 'Nguoi thu 1',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                },
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                },
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                },
            ]
        },
        {
            total: 1000,
            referrer: 'Nguoi thu 2',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '3',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '4',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '5',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '6',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '7',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '88888',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '999999',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '10',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '11',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '12',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '13',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '14',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '15',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '16',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '17',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        },
        {
            total: 1000,
            referrer: '18',
            values: [
                {
                    rule: 'Click',
                    cost: 20222
                },
                {
                    rule: 'Xem',
                    cost: 20222
                }
            ]
        }
    ];

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
        slideRef, selectLimit, paginationListHistories, data, handleSlide
    };
}