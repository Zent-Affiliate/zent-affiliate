import React from 'react';
import styles from './styles.module.scss';
import {Row, Col, Card, Flex, Empty, Tooltip} from 'antd';
import {useSelector} from 'react-redux';
import Handle from './handle';
import IconEditTable from '@/assets/images/icons/duotone/pencil.svg';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import InlineSVG from 'react-inlinesvg';
import {TYPE_SUBMIT} from '@/utils/constains';
import LoadingDataServer from '../LoadingDataServer';

function CardServerList() {
  const dataListServers = useSelector((state) => state.server.servers);
  const isLoadingListServer = useSelector((state) => state.server.isLoadingListServer);
  
  const {
    handleShowModalUpdateServer,
    handleDeleteServerAlert,
  } = Handle();
  
  return (
    <div>
      {
        dataListServers?.length === 0 ? (
          isLoadingListServer ? <LoadingDataServer/> :
            <div className={'flex justify-center items-center h-[60vh]'}>
              <Empty description={'Không có dữ liệu'}/>
            </div>
        ) : (
          <Row gutter={15}>
            {dataListServers?.map((item, index) => {
            const services = item.services.filter((service) => service.type === 0)
            const dockerContainers = item.services.filter((service) => service.type === 1)

            return (
              <Col span={8} key={index}>
                <Card
                  title={
                    <div className={`flex items-center h-12`}>
                      <div
                        title={item.name}
                        className={`text-black-title mr-5 whitespace-nowrap overflow-hidden overflow-ellipsis break-words`}
                      >
                        {item.name}
                      </div>
                        <div className="w-10 flex items-center">
                            <div className={`${item.status ? styles.animationPulseGreen : styles.animationPulseRed}`}>
                            </div>
                        </div>
                    </div>
                  }
                  className="mb-4"
                  extra={
                    <Flex gap="small" wrap="wrap" className="flex">
                      <div
                        className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] mr-2 cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                        onClick={() => handleShowModalUpdateServer(item, TYPE_SUBMIT.UPDATE)}
                      >
                        <InlineSVG src={IconEditTable} className={`w-[16px] h-[16px] `} alt=""/>
                      </div>
                      
                      <div
                        className={`flex justify-center items-center rounded-md w-8 h-8 bg-[#F9F9F9] cursor-pointer !fill-[#99A1B7] hover:!fill-blue-55`}
                        onClick={() => handleDeleteServerAlert(item)}
                      >
                        <InlineSVG src={IconDeleteTable} className={`w-[16px] h-[16px]`} alt=""/>
                      </div>
                    </Flex>
                  }
                >
                  <div className={`h-[228px]`}>
                    <div className={`font-semibold text-black-subContent mb-3 mt-[-10px]`}>IP: {item.ip}</div>
                    <div className={`flex`}>
                      <span className={`${styles.brick_primary} flex items-start`}></span>
                      <div >
                        <span className={`overflow-hidden text-black-subContent font-medium line-clamp-2`}>
                        <span className={`font-semibold text-black-title mr-1`}>Tên CPU:</span>
                          {
                            item.cpu_name ? item.cpu_name : 
                            <span className="italic ml-1 text-gray-400">
                              Đang cập nhật
                            </span>
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                      <span className={`font-semibold text-black-title mr-1`}>CPU:</span>
                      <div className="text-black-subContent font-medium">
                        <span>{item.stats ? item.stats.cpu_used : 0} %</span>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                      <span className={`font-semibold text-black-title mr-1`}>RAM:</span>
                      <div className="text-black-subContent font-medium">
                        <span>{item.stats ? item.stats.ram_used : 0} GB / </span>
                        <span>{item.ram ? item.ram : 0} GB</span>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                      <span className={`font-semibold text-black-title mr-1`}>Ổ cứng:</span>
                      <div className="text-black-subContent font-medium">
                        <span>{item.stats ? item.stats.disk_used : 0} GB / </span>
                        <span>{item.disk ? item.disk : 0} GB</span>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                     <Tooltip 
                      title={
                        services.length > 0 ? 
                        <div className='max-h-[300px] overflow-auto'>
                          {services?.map((service,index) => 
                          <div key={index} className={`${service.status ? styles.greenUnderline : styles.redUnderline} mr-2`}>{service.name}</div>
                          )} 
                        </div> : null
                      }
                      placement="right"
                     >
                        <span className={`font-semibold text-black-title mr-1`}>Service:</span>
                        <span className={`text-black-subContent font-medium`}>
                          {`${item.totalServices || 0} / ${item.totalTypeZero || 0}`}
                        </span>
                     </Tooltip>
                    </div>

                    <div className={styles.content}>
                     <Tooltip
                      title={
                        dockerContainers.length > 0 ? 
                        <div className='max-h-[300px] overflow-auto'>
                          {dockerContainers?.map((docker,index) =>
                          <div key={index} className='flex'>
                            <span className={`flex items-start py-[6.5px] ${docker.status ? styles.greenUnderline : styles.redUnderline}`}></span>
                            <span className='mr-2'>{docker.name}</span>
                          </div>)}
                        </div> : null
                      }
                      placement="right"
                     >
                        <span className={`font-semibold text-black-title mr-1`}>Docker container:</span>
                        <span className={`text-black-subContent font-medium`}>
                          {`${item.totalDockers || 0} / ${item.totalTypeOne || 0}`}
                        </span>
                     </Tooltip>
                    </div>
                  </div>
                  <div>
                    {item.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className={`border-[1px] text-[11px] rounded-[3px] px-[2px] py-[0px] border-[#17c653]
                        text-[#17c653] mr-[6px] mt-1 whitespace-nowrap inline-block`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </Card>
              </Col>
            )})}
          </Row>
        )
      }
    </div>
  );
}

export default CardServerList;
