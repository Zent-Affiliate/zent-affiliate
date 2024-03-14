import {createSlice} from '@reduxjs/toolkit';

const commissionSlice = createSlice({
    name: 'commission',
    initialState: {
        commissions: [
            {
                _id: 1,
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
                    }
                ]
            },
            {
                _id: 2,
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
                _id: 3,
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
                _id: 4,
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
                _id: 5,
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
                _id: 6,
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
                _id: 7,
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
                _id: 8,
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
                _id: 9,
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
                _id: 10,
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
                _id: 11,
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
                _id: 12,
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
                _id: 13,
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
                _id: 14,
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
                _id: 15,
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
                _id: 16,
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
                _id: 17,
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
                _id: 18,
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
        ],
        activeCommission: {},
        paginationListHistories: {
            currentPage: 1,
            perPage: 10,
            totalRecord: 0
        }
    },
    reducers: {
        setActiveCommission: (state, action) => ({
            ...state,
            activeCommission: action.payload
        })
    }

});

export const {
    setActiveCommission
} = commissionSlice.actions;
export default commissionSlice.reducer;
