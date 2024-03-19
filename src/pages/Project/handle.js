import {getListProjects, getSecretKey, handleCreateProject, handleUpdateProject} from '@/api/project';
import {
    setDataFilter,
    setErrorInfoProject,
    setInfoProject,
    setProjectActive,
    setVisibleModalCreateProject,
    setVisibleModalDeleteProject,
    setVisibleModalUpdateProject
} from '@/states/modules/project';
import {TYPE_SUBMIT} from '@/utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import './styles.module.scss';
import {validate} from '@/utils/validates';
import _ from 'lodash';

export default function Handle() {
    const dispatch = useDispatch();
    const infoProject = useSelector((state) => state.project.infoProject);
    const errorInfoProject = useSelector((state) => state.project.errorInfoProject);
    const dataFilter = useSelector((state) => state.project.dataFilter);
    const paginationListProjects = useSelector((state) => state.project.paginationListProjects);

    const handleCancelModalCreateProject = () => {
        dispatch(
            setErrorInfoProject({
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );

        dispatch(
            setInfoProject({
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProject(false));

    };

    const handleGetKey = () => {
        dispatch(getSecretKey());
    };

    const handleShowModalCreateProject = () => {
        dispatch(
            setInfoProject({
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProject(true));
    };

    const handleCancelModalUpdateProject = () => {
        dispatch(setProjectActive(null));
        dispatch(setVisibleModalUpdateProject(false));
    };

    const handleCancelModalDeleteProject = () => {
        dispatch(setVisibleModalDeleteProject(false));
    };

    const handleSearchProject = (value) => {
        dispatch(setDataFilter({...dataFilter, keySearch: value}));
        if (!value) {
            dispatch(getListProjects());
        }
    };

    const handleEnterSearchProject = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListProjects());
        }
    };

    const handleChangeSelectProject = (perPage) => {
        dispatch(setDataFilter({...paginationListProjects, perPage, page: 1}));
        dispatch(getListProjects());
    };

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(infoProject);
        let dataError = _.cloneDeep(errorInfoProject);
        data[type] = value;
        dataError[type] = '';
        dispatch(setInfoProject(data));
        dispatch(setErrorInfoProject(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorInfoProject);
        dataError[type] = '';
        dispatch(setErrorInfoProject(dataError));
    };

    const handleSubmit = (type, scheme, dataProject) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(handleCreateProject(data)),
                onError: (error) => dispatch(setErrorInfoProject(error))
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(handleUpdateProject(data)),
                onError: (error) => dispatch(setErrorInfoProject(error))
            });
        }
    };

    return {
        handleSearchProject,
        handleShowModalCreateProject,
        handleCancelModalCreateProject,
        handleCancelModalUpdateProject,
        handleCancelModalDeleteProject,
        handleEnterSearchProject,
        handleChangeSelectProject,
        handleChangeInputInfo,
        handleFocus,
        handleSubmit,
        handleGetKey
    };
} 