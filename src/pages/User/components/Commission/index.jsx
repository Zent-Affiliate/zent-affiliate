import React, { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import {Card, Col, Empty, Input, Row,} from 'antd';
import Handle from '@/pages/User/components/Commission/handle.js';
import HistoryTable from '@/pages/User/components/Commission/components/HistoryTable/index.jsx';
import CommissionItem from '@/pages/User/components/Commission/components/CommissionItem/index.jsx';
import InlineSVG from 'react-inlinesvg';
import ArrowIcon from '../../../../assets/images/icons/solid/arrow.svg';
import styles from './styles.module.scss';
import IconSearch from '@/assets/images/icons/duotone/magnifying-glass.svg';
import UserItem from './components/UserItem/index.jsx';
import { refreshState } from '@/states/modules/commission';

function Commission() {
  const {
    isEndOfSlide,
    isStartOfSlide,
    slideRef,
    commissions,
    dataListUser,
    isLoadingGetListUser,
    dataFilterUsers,
    handleChangeInput,
    handleSearchUser,
    handleClickUser,
    dispatch,

    handleSlide,
  } = Handle();

  useEffect(()=>{
    return ()=>dispatch(refreshState())
  },[]);

  return (
    <MainLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            loading={isLoadingGetListUser}
            bordered={false}
            title={
              <div>
                <div>
                  <div className={'my-5 text-center'}>List user</div>
                  <div className={'mb-3.5 w-full '}>
                    <Input
                      onKeyDown={handleSearchUser}
                      prefix={<img src={IconSearch} className={`w-3.5 mr-1.5`} alt="" />}
                      className={`main-input`}
                      placeholder={'Enter search...'}
                      value={dataFilterUsers.keySearch}
                      onChange={(e) => handleChangeInput(e)}
                    />
                  </div>
                </div>
              </div>
            }
          >
            {dataListUser?.length === 0 ? (
              <div className={'h-full flex justify-center items-center'}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No data'} />
              </div>
            ) : (
              dataListUser?.map((record) => <UserItem record={record} key={record.id} onClick={handleClickUser}/>)
            )}
          </Card>
        </Col>
        <Col span={18}>
          <div className={'mt-6'}>
            <div className={`h-[165px] mb-5 flex`}>
              <div
                className={`${isStartOfSlide ? styles.slideIconDisabled : styles.slideIcon}`}
                onClick={() => handleSlide('back')}
              >
                <InlineSVG src={ArrowIcon} width={65} height={25} className={'rotate-[270deg]'} />
              </div>
              <div className={styles.commissionsWrap}>
                <div className={styles.commissionsContainer} ref={slideRef}>
                  {commissions.map((commission, index) => (
                    <CommissionItem key={index} commission={commission} />
                  ))}
                </div>
              </div>
              <div
                className={`${isEndOfSlide ? styles.slideIconDisabled : styles.slideIcon}`}
                onClick={() => handleSlide('next')}
              >
                <InlineSVG src={ArrowIcon} width={65} height={25} className={'rotate-[90deg]'} />
              </div>
            </div>

            <div className={`bg-white rounded-lg border shadow-sm h-[calc(100vh_-_400px)] px-8 pt-6`}>
              <div className={'text-center font-bold text-[#787878] text-base'}>List histories</div>
              <div className={`relative main-select mt-5`}>
                <HistoryTable />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Commission;
