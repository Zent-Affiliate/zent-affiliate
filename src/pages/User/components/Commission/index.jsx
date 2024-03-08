import React, {useEffect} from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import {setBreadcrumb} from '@/states/modules/app/index.js';
import {useDispatch} from 'react-redux';
import {Select} from 'antd';
import Handle from '@/pages/User/components/Commission/handle.js';
import HistoryTable from '@/pages/User/components/Commission/components/HistoryTable/index.jsx';
import CommissionItem from '@/pages/User/components/Commission/components/CommissionItem/index.jsx';
import InlineSVG from 'react-inlinesvg';
import ArrowIcon from '../../../../assets/images/icons/solid/arrow.svg';
import styles from './styles.module.scss';

function Commission() {
    const dispatch = useDispatch();
    const {
        isEndOfSlide,
        isStartOfSlide,
        slideRef,
        selectLimit,
        paginationListHistories,
        data,

        handleSlide
    } = Handle();

    useEffect(() => {
        let dataBreadcrumb = [
            {
                path: '/',
                name: 'Quản lý dự án'
            },
            {
                path: '/users',
                name: 'Danh sách khách hàng'
            },
            {
                path: '/users/:id',
                name: 'Lịch sử giao dịch'
            }
        ];
        dispatch(setBreadcrumb(dataBreadcrumb));

        return () => dispatch(setBreadcrumb([]));
    }, [dispatch]);

    return <MainLayout>
        <div className={'mt-6'}>
            <div className={`h-[180px] mb-5 flex`}>
                <div className={`${isStartOfSlide ? styles.slideIconDisabled : styles.slideIcon}`}
                     onClick={() => handleSlide('back')}>
                    <InlineSVG src={ArrowIcon} width={65} height={25} className={'rotate-[270deg]'} />
                </div>
                <div className={styles.commissionsWrap}>
                    <div className={styles.commissionsContainer} ref={slideRef}>
                        {
                            data.map((commission, index) => (
                                <CommissionItem key={index} commission={commission} />
                            ))
                        }
                    </div>
                </div>
                <div className={`${isEndOfSlide ? styles.slideIconDisabled : styles.slideIcon}`}
                     onClick={() => handleSlide('next')}>
                    <InlineSVG src={ArrowIcon} width={65} height={25} className={'rotate-[90deg]'} />
                </div>
            </div>

            <div className={`bg-white rounded-lg border shadow-sm h-[calc(100vh_-_400px)] px-8 pt-6`}>
                <div className={'text-center font-bold text-[#787878] text-base'}>Lịch sử giao dịch</div>
                <div className={`relative main-select mt-5`}>
                    <HistoryTable />
                    <Select
                        className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
                        value={paginationListHistories.perPage}
                        options={selectLimit.map((value) => ({value, label: `Hiển thị ${value}`}))}
                        // onChange={(e) => handleChangeSelectHistory(e)}
                    />
                </div>
            </div>
        </div>
    </MainLayout>;
}

export default Commission;