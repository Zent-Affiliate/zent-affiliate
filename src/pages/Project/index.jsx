import React, {useEffect} from "react";
import MainLayout from "@/layouts/MainLayout/index.jsx";
import {setBreadcrumb} from "@/states/modules/app";
import {Button, Input, Popover, Select} from "antd";
import InlineSVG from "react-inlinesvg";
import PlusIcon from "@/assets/images/icons/light/plus.svg";
import SearchIcon from "@/assets/images/icons/duotone/magnifying-glass.svg";
import FilterIcon from "@/assets/images/icons/duotone/filter-list.svg";
import {useDispatch, useSelector} from "react-redux";
import TableProject from "./components/TableProject";
import Handle from "./handle";
import ModalDefault from "@/components/Modal";
import ModalCreateProject from "./components/CreateModalProject";
import ModalDeleteProject from "./components/DeleteModalProject";
import {handleDeleteProject} from "@/api/project";
import ModalDeleteDefault from "@/components/ModalDelete";
import ModalUpdateProject from "./components/UpdateModalProject";
import FilterPopover from "./components/FilterPopover";
import {setVisiblePopoverSelect} from "@/states/modules/project";

function Project() {
  const dispatch = useDispatch();
  const isLoadingBtnDeleteProject = useSelector(state => state.project.isLoadingBtnDeleteProject);
  const visibleModalCreateProject = useSelector(state => state.project.visibleModalCreateProject);
  const visiblePopoverSelect = useSelector(state => state.project.visiblePopoverSelect);
  const visibleModalUpdateProject = useSelector(state => state.project.visibleModalUpdateProject);
  const visibleModalDeleteProject = useSelector(state => state.project.visibleModalDeleteProject);
  const paginationListProjects = useSelector((state) => state.project.paginationListProjects);
  const dataFilter = useSelector((state) => state.project.dataFilter);
  const infoProject = useSelector((state) => state.project.infoProject);
  
  const handleOpenChange = (newOpen) => {
    dispatch(setVisiblePopoverSelect(newOpen))
  };
  
  const selectLimit = [20, 50, 100];
  
  const {
    handleCancelModalCreateProject,
    handleCancelModalUpdateProject,
    handleCancelModalDeleteProject,
    handleSearchProject,
    handleChangeSelectProject,
    handleEnterSearchProject,
    handleShowModalCreateProject,
    handleShowPopoverSelect,
  } = Handle();
  
  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ'
      },
      {
        path: '/projects',
        name: 'Quản lý dự án'
      }
    ]
    dispatch(setBreadcrumb(dataBreadcrumb));
    
    return () => dispatch(setBreadcrumb([]));
  }, [dispatch]);
  
  return (
    <MainLayout>
      <div className={`bg-white rounded-lg border shadow-sm`}>
        <div className={`py-5 px-7`}>
          <div className={`flex justify-between mb-2.5`}>
            <div className={`w-96`}>
              <Input
                value={dataFilter.keySearch}
                onKeyDown={(e) => handleEnterSearchProject(e)}
                onChange={(e) => handleSearchProject(e.target.value)}
                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt=""/>}
                className={`main-input`}
                placeholder="Tìm kiếm dự án theo tên và link dự án"
              />
            </div>
            <div className={`flex`}>
              <div className={`mr-2.5`}>
                <Popover
                  content={<FilterPopover/>}
                  placement="bottomRight"
                  open={visiblePopoverSelect}
                  onOpenChange={handleOpenChange}
                  trigger={"click"}
                  title={
                    <div className="px-6 border-b border-gray-200 border-solid">
                      <span className="text-[15px] !leading-[55px] text-black-content">
                          Bộ lọc dự án
                      </span>
                    </div>
                  }
                >
                  <Button
                    icon={<InlineSVG src={FilterIcon} className={`w-4 h-4 fill-current`} alt=""/>}
                    className={`flex items-center h-full !bg-blue-100 !text-blue-500 main-btn-primary hover:!bg-blue-500 hover:!text-white border-none`}
                    onClick={handleShowPopoverSelect}
                  >
                    Bộ lọc
                  </Button>
                </Popover>
              </div>
              <div>
                <Button
                  icon={<InlineSVG src={PlusIcon} className={`w-4 h-4`} alt=""/>}
                  className={`flex items-center ant-btn-primary h-full`}
                  onClick={handleShowModalCreateProject}
                >
                  Tạo mới
                </Button>
              </div>
            </div>
          </div>
          <div className={`relative main-select`}>
            <TableProject/>
            <Select
              className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
              value={paginationListProjects.perPage}
              options={selectLimit.map((value) => ({value, label: `Hiển thị ${value}`}))}
              onChange={e => handleChangeSelectProject(e)}
            />
          </div>
          
          <ModalDefault
            isModalOpen={visibleModalCreateProject}
            handleCancel={handleCancelModalCreateProject}
            title="Tạo mới dự án"
          >
            <ModalCreateProject/>
          </ModalDefault>
          
          <ModalDefault
            isModalOpen={visibleModalUpdateProject}
            handleCancel={handleCancelModalUpdateProject}
            title="Cập nhật thông tin dự án"
          >
            <ModalUpdateProject/>
          </ModalDefault>
          
          <ModalDeleteDefault
            loading={isLoadingBtnDeleteProject}
            isModalOpen={visibleModalDeleteProject}
            handleCancel={handleCancelModalDeleteProject}
            handleConfirm={() => dispatch(handleDeleteProject(infoProject._id))}
            content={<ModalDeleteProject content={infoProject.name}/>}
            contentBtn="Xóa"
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Project;
