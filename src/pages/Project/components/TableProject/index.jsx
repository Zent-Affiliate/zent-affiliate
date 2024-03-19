import React from 'react';
import {Empty, Skeleton} from 'antd';
import Handle from './handle';
import {useSelector} from 'react-redux';
import styles from './styles.module.scss';
import CardProject from '@/pages/Project/components/CardProject/index.jsx';

function TableProject(props) {
    const {isSuperAdmin} = props;
    const dataListProjects = useSelector((state) => state.project.projects);
    const isLoadingTableProject = useSelector((state) => state.project.isLoadingTableProject);
    // const paginationListProjects = useSelector((state) => state.project.paginationListProjects);

    const {
        handleShowModalUpdateProject,
        handleDeleteProjectAlert,
        // handleChangePaginationProject,
        redirectToProject
    } = Handle();

    return (
        <div>
            {(dataListProjects && dataListProjects?.length > 0) ?
                <div className={`${isSuperAdmin ? 'h-[66vh]' : 'h-[80vh]'} ${styles.listProjectWrap}`}>
                    {
                        isLoadingTableProject ?
                            <Skeleton loading={true} active></Skeleton> :
                            <div className={`${styles.listProject} gap-2.5`}>
                                {
                                    dataListProjects?.map((project) => {
                                        return <CardProject
                                            key={project._id}
                                            project={project}
                                            handleShowModalUpdateProject={(pr) => handleShowModalUpdateProject(pr)}
                                            handleDeleteProjectAlert={(pr) => handleDeleteProjectAlert(pr)}
                                            redirectToProject={(pr) => redirectToProject(pr)}
                                        />;
                                    })
                                }
                            </div>
                    }
                </div>
                : <div className={'h-[calc(100vh_-_220px)] flex justify-center items-center'}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No data'} />
                </div>
            }
        </div>
    );
}

export default TableProject;
