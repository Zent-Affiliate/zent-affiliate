import {getListProjects} from '@/api/project'
import {setDataFilter, setVisiblePopoverSelect} from '@/states/modules/project'
import {useDispatch, useSelector} from 'react-redux'

export default function Handle() {
  const dispatch = useDispatch()
  const dataFilter = useSelector((state) => state.project.dataFilter)
  
  const handleFilterTableProject = (type, value) => {
    if (type === 'server') {
      dispatch(setDataFilter({...dataFilter, server: value}))
    }
    if (type === 'tags') {
      dispatch(setDataFilter({...dataFilter, tags: value}))
    }
    if (type === 'status') {
      dispatch(setDataFilter({...dataFilter, status: value}))
    }
  }
  
  const handleCancelPopoverSelect = () => {
    dispatch(setVisiblePopoverSelect(false))
  }
  
  const handleFilterProject = () => {
    dispatch(setVisiblePopoverSelect(false))
    dispatch(getListProjects())
  }
  
  return {
    handleFilterTableProject,
    handleCancelPopoverSelect,
    handleFilterProject,
  }
}
