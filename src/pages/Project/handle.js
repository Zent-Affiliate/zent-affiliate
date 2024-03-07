import './styles.scss'
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import {
  setDataFilter,
  setErrorInfoProject,
  setInfoProject,
  setListDataProject,
  setVisibleModalCreateProject,
  setVisibleModalDeleteProject,
  setVisibleModalUpdateProject,
  setVisiblePopoverSelect,
} from '@/states/modules/project'
import {getListProjects, handleCreateProject, handleUpdateProject} from '@/api/project'
import {TYPE_SUBMIT} from '@/utils/constains'
import {validate} from '@/utils/validates'
import {getListTags} from '@/api/tag'
import {getAllServers} from '@/api/server'
import {useEffect, useRef} from 'react'
import socketIOClient from 'socket.io-client'
import {decryptData} from '@/utils/crypto'
import store from '@/states/configureStore'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.project.dataFilter)
  const infoProject = useSelector((state) => state.project.infoProject)
  const errorInfoProject = useSelector((state) => state.project.errorInfoProject)
  const paginationListProjects = useSelector((state) => state.project.paginationListProjects)
  const isLoadingBtnCreateProject = useSelector(state => state.project.isLoadingBtnCreateProject);
  const dataListServers = useSelector((state) => state.server.servers)
  const dataListTags = useSelector((state) => state.tag.tags)
  const isLoadingBtnUpdateProject = useSelector(state => state.project.isLoadingBtnUpdateProject);
  
  const optionServer = dataListServers?.map(item => ({value: item._id, label: item.name}))
  const optionTag = dataListTags?.map(item => ({value: item._id, label: item.name}))
  
  const socket = useRef()
  
  const handleShowModalCreateProject = () => {
    dispatch(
      setErrorInfoProject({
        name: '',
        domain: '',
        server: '',
        tags: '',
        status: '',
      })
    )
    dispatch(
      setInfoProject({
        name: '',
        domain: '',
        server: '',
        tags: [],
        status: '',
      })
    )
    dispatch(setVisibleModalCreateProject(true))
  }
  
  const handleShowPopoverSelect = () => {
    dispatch(getAllServers())
    dispatch(getListTags())
    dispatch(setVisiblePopoverSelect(true))
  }
  
  const handleCancelModalCreateProject = () => {
    dispatch(
      setErrorInfoProject({
        name: '',
        domain: '',
        server: '',
        tags: '',
        status: '',
      })
    )
    dispatch(
      setInfoProject({
        name: '',
        domain: '',
        server: '',
        tags: [],
        status: '',
      })
    )
    dispatch(setVisibleModalCreateProject(false))
  }
  
  const handleCancelModalUpdateProject = () => {
    dispatch(setVisibleModalUpdateProject(false))
  }
  
  const handleCancelModalDeleteProject = () => {
    dispatch(setVisibleModalDeleteProject(false))
  }
  
  const handleCancelPopoverSelect = () => {
    dispatch(setVisiblePopoverSelect(false))
  }
  
  const handleChangeInputInfo = (valueInput, type) => {
    let data = _.cloneDeep(infoProject)
    if (type === 'tags') {
      const newValue = valueInput.filter(tag => tag.trim() !== '');
      data[type] = newValue;
    } else {
      _.set(data, type, valueInput)
    }
    dispatch(setInfoProject(data))
    let dataError = _.cloneDeep(errorInfoProject)
    dataError[type] = ''
    dispatch(setErrorInfoProject(dataError))
  }
  
  const handleSubmit = (type, scheme, dataProject) => {
    if (type === TYPE_SUBMIT.CREATE) {
      validate(scheme, dataProject, {
        onSuccess: (data) => dispatch(handleCreateProject(data)),
        onError: (error) => dispatch(setErrorInfoProject(error)),
      })
    }
    
    if (type === TYPE_SUBMIT.UPDATE) {
      validate(scheme, dataProject, {
        onSuccess: (data) => dispatch(handleUpdateProject(data._id, data)),
        onError: (error) => dispatch(setErrorInfoProject(error)),
      })
    }
  }
  
  const handleChangeSelectProject = (perPage) => {
    dispatch(setDataFilter({...paginationListProjects, perPage, page: 1}))
    dispatch(getListProjects())
  }
  
  const handleSearchProject = (value) => {
    dispatch(setDataFilter({...dataFilter, keySearch: value}))
    if (!value) {
      dispatch(getListProjects())
    }
  }
  
  const handleEnterSearchProject = (event) => {
    if (event.key === 'Enter') {
      dispatch(getListProjects())
    }
  }
  
  const handleFocus = (type) => {
    let dataError = _.cloneDeep(errorInfoProject)
    dataError[type] = ''
    dispatch(setErrorInfoProject(dataError))
  }
  
  const handleSwitchChange = (checked) => {
    const switchIndex = checked ? 1 : 0
    dispatch(setInfoProject({...infoProject, status: switchIndex}))
  }
  
  const handelOnchangeOption = (value) => {
    dispatch(setInfoProject({...infoProject, domain: value + infoProject.domain}));
  }
  
  useEffect(() => {
    dispatch(getAllServers())
    dispatch(getListTags())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    socket.current = socketIOClient.connect(import.meta.env.VITE_API_URL)
  }, [])
  
  useEffect(() => {
    socket.current.on('getProject', (dataEncrypt) => {
      const data = decryptData(dataEncrypt.dataEncrypt);
      const listProject = store.getState().project.projects;
      const updateListProject = listProject.map((item) => {
        const foundObject = data.find(obj => obj._id === item._id);
        return foundObject || item
      })
      dispatch(setListDataProject(updateListProject))
    })
    
    return () => {
      socket.current.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return {
    handleShowModalCreateProject,
    handleShowPopoverSelect,
    handleCancelModalCreateProject,
    handleCancelModalUpdateProject,
    handleCancelModalDeleteProject,
    handleCancelPopoverSelect,
    handleChangeSelectProject,
    handleEnterSearchProject,
    handleChangeInputInfo,
    handleSearchProject,
    handleFocus,
    handleSwitchChange,
    handleSubmit,
    handelOnchangeOption,
    infoProject,
    errorInfoProject,
    optionServer,
    optionTag,
    isLoadingBtnCreateProject,
    isLoadingBtnUpdateProject
  }
}
