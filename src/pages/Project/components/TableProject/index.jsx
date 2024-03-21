import React from 'react';
import {Skeleton} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import CardProject from '@/pages/Project/components/CardProject/index.jsx';

function TableProject(props) {
    const { isSuperAdmin } = props;
    const dataListProjects = useSelector((state) => state.project.projects);
    const isLoadingTableProject = useSelector((state) => state.project.isLoadingTableProject);
    // const paginationListProjects = useSelector((state) => state.project.paginationListProjects);

    const {
        handleShowModalUpdateProject,
        handleDeleteProjectAlert,
        // handleChangePaginationProject,
        redirectToProject,
    } = Handle();

    return (
        <div>
            <div className={`${isSuperAdmin?'h-[66vh]':'h-[80vh]'} ${styles.listProjectWrap}`}>
            {
                isLoadingTableProject?
                    <Skeleton loading={true} active></Skeleton> :
                    <div className={`${styles.listProject} gap-2.5`}>
                        {
                            dataListProjects.map((project) => {
                                return <CardProject
                                  key={project._id}
                                  project={project}
                                  handleShowModalUpdateProject={(pr) => handleShowModalUpdateProject(pr)}
                                  handleDeleteProjectAlert={(pr) =>handleDeleteProjectAlert(pr)}
                                  redirectToProject={(pr) =>redirectToProject(pr)}
                                />
                          })
                        }
                    </div>
            }
            </div>
            {/*{*/}
            {/*    paginationListProjects ?*/}
            {/*      <Pagination*/}
            {/*        className={'flex justify-end'}*/}
            {/*        current={paginationListProjects.currentPage}*/}
            {/*        total={paginationListProjects.totalRecord}*/}
            {/*        pageSize={paginationListProjects.perPage}*/}
            {/*        onChange={(e) => handleChangePaginationProject(e)}*/}
            {/*        showSizeChanger={false}*/}
            {/*      />*/}
            {/*      : ''*/}
            {/*}*/}
        </div>
    );
}

export default TableProject;
