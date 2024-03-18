import { getListProjectAdmins, createProjectAdmin, updateProjectAdmin } from "@/api/projectAdmin";
import { 
    setDataFilter, 
    setErrorInfoProjectAdmin, 
    setInfoProjectAdmin, 
    setProjectAdminActive, 
    setVisibleModalCreateProjectAdmin, 
    setVisibleModalDeleteProjectAdmin, 
    setVisibleModalUpdateProjectAdmin } from "@/states/modules/projectAdmin";
import { TYPE_SUBMIT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
// import './styles.module.scss';
import { validate } from "@/utils/validates";
import _ from "lodash";


export default function Handle(){
    const dispatch = useDispatch();
    const infoProjectAdmin = useSelector((state) => state.projectAdmin.infoProject);
    const errorInfoProjectAdmin = useSelector((state) => state.projectAdmin.errorInfoProject);
    const dataFilter = useSelector((state) => state.projectAdmin.dataFilter);
    const paginationListProjectAdmins = useSelector((state) => state.project.paginationListProjectAdmins);

    const handleCancelModalCreateProjectAdmin = () =>{
        dispatch(
            setErrorInfoProjectAdmin({
                _id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );

        dispatch(
            setErrorInfoProjectAdmin({
                id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProjectAdmin(false));
    };

    const handleShowModalCreateProjectAdmin = () => {
        dispatch(
            setInfoProjectAdmin({
                _id: '',
                code: '',
                name: '',
                admin_id: '',
                secret_key: ''
            })
        );
        dispatch(setVisibleModalCreateProjectAdmin(true))
    };

    const handleCancelModalUpdateProjectAdmin = () => {
        dispatch(setProjectAdminActive(null))
        dispatch(setVisibleModalUpdateProjectAdmin(false))
    }

    const handleCancelModalDeleteProjectAdmin = () => {
        dispatch(setVisibleModalDeleteProjectAdmin(false));
    };

    const handleSearchProjectAdmin = (value) => {
        dispatch(setDataFilter({ ...dataFilter, keySearch: value }));
        if (!value) {
            dispatch(getListProjectAdmins());
        }
    };

    const handleEnterSearchProjectAdmin = (event) => {
        if (event.key === 'Enter') {
            dispatch(getListProjectAdmins());
        }
    };

    const handleChangeSelectProjectAdmin = (perPage) => {
        dispatch(setDataFilter({ ...paginationListProjectAdmins, perPage, page: 1 }));
        dispatch(getListProjectAdmins());
    };

    const handleChangeInputInfo = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(infoProjectAdmin);
        let dataError = _.cloneDeep(errorInfoProjectAdmin);
        data[type] = value;
        dataError[type] = '';
        dispatch(setInfoProjectAdmin(data));
        dispatch(setErrorInfoProjectAdmin(dataError));
    };

    const handleFocus = (type) => {
        let dataError = _.cloneDeep(errorInfoProjectAdmin);
        dataError[type] = '';
        dispatch(setErrorInfoProjectAdmin(dataError));
    };

    const handleSubmit = (type, scheme, dataProject) => {
        if (type === TYPE_SUBMIT.CREATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(createProjectAdmin(data)),
                onError: (error) => dispatch(setErrorInfoProjectAdmin(error))
            });
        }

        if (type === TYPE_SUBMIT.UPDATE) {
            validate(scheme, dataProject, {
                onSuccess: (data) => dispatch(updateProjectAdmin( data)),
                onError: (error) => dispatch(setErrorInfoProjectAdmin(error))
            });
        }
    };

    return{
        handleSearchProjectAdmin,
        handleShowModalCreateProjectAdmin,
        handleCancelModalCreateProjectAdmin,
        handleCancelModalUpdateProjectAdmin,
        handleCancelModalDeleteProjectAdmin,
        handleEnterSearchProjectAdmin,
        handleChangeSelectProjectAdmin,
        handleChangeInputInfo,
        handleFocus,
        handleSubmit
    }
} 