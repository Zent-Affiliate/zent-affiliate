import React from 'react';
import {Row, Col, Skeleton} from 'antd';

function LoadingDataServer() {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 3; i++) {
      skeletons.push(
        <Col key={i} span={8}>
          <Row className='flex items-center'>
            <Col span={15}>
              <Skeleton.Input active={true} size={'small'}/>
            </Col>
            <Col span={9} className='flex items-center justify-end'>
              <Skeleton.Avatar active={true} size={'default'} shape={'circle'}/>
              <Skeleton.Avatar active={true} size={'default'} shape={'circle'} className='ml-2.5'/>
            </Col>
          </Row>
          <br/>
          <Skeleton active/>
        </Col>
      );
    }
    return skeletons;
  };
  
  return (
    <>
      <Row gutter={20}>
        {renderSkeletons()}
      </Row>
    </>
  );
}

export default LoadingDataServer;
