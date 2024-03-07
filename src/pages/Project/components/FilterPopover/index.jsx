import {Button, Select} from "antd";
import React from "react";
import Handle from './handle';
import {useSelector} from "react-redux";
import { PROJECT_STATUS } from "@/utils/constains";

function FilterPopover() {
  const dataListServers = useSelector((state) => state.server.servers)
  const dataListTags = useSelector((state) => state.tag.tags)
  
  const optionServer = dataListServers?.map(item => ({value: item._id, label: item.name}))
  const optionTag = dataListTags?.map(item => ({value: item._id, label: item.name}))
  const optionStatus = [
    {
      value: PROJECT_STATUS.STOPPING,
      label: 'Đã dừng',
    },
    {
      value: PROJECT_STATUS.RUNNING,
      label: 'Đang hoạt động',
    }
  ];
  
  const {
    handleFilterTableProject,
    handleCancelPopoverSelect,
    handleFilterProject,
  } = Handle()
  
  const handleSelect = (type, value) => {
    if (type === 'server') {
      handleFilterTableProject('server', value?.value)
    }
    if (type === 'tags') {
      handleFilterTableProject('tags', value.map(item => item?.value))
    }
    if (type === 'status') {
      handleFilterTableProject('status', value)
    }
  }
  
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
            onChange={(value) => handleSelect('status', value)}
            allowClear
            options={optionStatus}
          />
        </div>
        <div className={`mb-8`}>
          <div className={`label-wrap mb-2 text-black-content`}>
            Máy chủ:
          </div>
          <Select
            className={`main-select w-full`}
            placeholder="Chọn máy chủ"
            onChange={(type, value) => handleSelect('server', value)}
            allowClear
            options={optionServer}
          />
        </div>
        <div className={`mb-8`}>
          <div className={`label-wrap mb-2 text-black-content`}>
            Nhãn dự án:
          </div>
          <Select
            className={`main-select w-full`}
            placeholder="Chọn nhãn dự án"
            mode="multiple"
            allowClear
            onChange={(type, value) => handleSelect('tags', value)}
            options={optionTag}
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          />
        </div>
        <div className={`flex justify-end`}>
          <Button
            className={`ant-btn-close mr-2.5`}
            size={'large'}
            onClick={handleCancelPopoverSelect}
          >
            Đóng
          </Button>
          <Button
            className={`ant-btn-primary`}
            size={'large'}
            onClick={handleFilterProject}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterPopover;