import {Button, Select} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import Handle from '@/pages/Server/handle';
import { SERVER_STATUS } from '@/utils/constains';

function FilterPopover() {
  const dataListTags = useSelector((state) => state.tag.tags);
  const dataFilterServer = useSelector((state) => state.server.dataFilterServer);
  const optionStatus = [
    {
      value: SERVER_STATUS.STOPPING,
      label: 'Đã dừng',
    },
    {
      value: SERVER_STATUS.RUNNING,
      label: 'Đang hoạt động',
    }
  ];
  const optionTag = dataListTags?.map((item) => ({value: item._id, label: item.name}));
  const {
    handleFilterServer,
    handleOpenFilterServer,
    handleFilter
  } = Handle();
  
  return (
    <div className={`rounded-lg bg-white w-80`}>
      <div className={`px-6 py-4`}>
        <div className={`mb-8`}>
          <div className={`label-wrap mb-2 text-black-content`}>
            Trạng thái:
          </div>
          <Select
            className={`main-select w-full`}
            placeholder="Chọn trạng thái"
            onChange={(value) => handleFilterServer('status', value)}
            value={dataFilterServer.status !== "" ? dataFilterServer.status : null}
            allowClear
            options={optionStatus}
          />
        </div>
        <div className={`mb-8`}>
          <div className={`label-wrap mb-2 text-black-content`}>
            Nhãn máy chủ:
          </div>
          <Select
            className={`main-select w-full`}
            placeholder="Chọn nhãn server"
            mode="multiple"
            allowClear
            value={dataFilterServer?.tags ? dataFilterServer.tags : null}
            onChange={(value) => handleFilterServer('tags', value)}
            options={optionTag}
            filterOption={(input, option) => {
              return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          />
        </div>
        <div className={`flex justify-end`}>
          <Button
            className={`ant-btn-close mr-2.5`}
            size={'large'}
            onClick={() => handleOpenFilterServer(false)}
          >
            Đóng
          </Button>
          <Button
            className={`ant-btn-primary`}
            size={'large'}
            onClick={handleFilter}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterPopover;
