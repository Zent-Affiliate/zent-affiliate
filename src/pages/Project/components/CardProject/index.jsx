import styles from '@/pages/Project/components/TableProject/styles.module.scss';
import {Button, Card, Tooltip} from 'antd';
import InlineSVG from 'react-inlinesvg';
import {useSelector} from 'react-redux';
import Edit from '@/assets/images/icons/duotone/pencil.svg';
import Delete from '@/assets/images/icons/duotone/trash-can.svg';
import OptionsIcon from '@/assets/images/icons/regular/options.svg';
import React, {useState} from 'react';

function cardProject(props) {
  const me = useSelector((state) => state.auth.me);
  const [openAction, setOpenAction] = useState(false);

  const handleUpdate = (pr) => {
    props.redirectToProject(pr)
    setOpenAction(false)
  }

  const handleDelete = (pr) => {
    props.handleShowModalUpdateProject(pr)
    setOpenAction(false)
  }


  const handleDeleteAlert = (pr) => {
    props.handleDeleteProjectAlert(pr)
    setOpenAction(false)
  }

  return (
    <Card className={`${styles.projectWrap}`}>
      <div className={`${styles.projectTitle}`}>
        <div className={`cursor-pointer ${styles.projectName}`} onClick={()=>handleUpdate(props.project._id)}>{props.project.name}</div>
        <div  className={`${styles.projectAction}`}>
          <Tooltip  title={
            <>
              <div className={`btn-edit mb-1`} onClick={() => handleDelete(props.project)}>
                <Button className={styles.actionBtn}>
                  <InlineSVG src={Edit} width={14} height={14} className={'mr-2'} />
                  Cập nhật
                </Button>
              </div>
              {
                me._id === props.project.admin_id?
                  <div className={`btn-delete`} onClick={() => handleDeleteAlert(props.project)}>
                    <Button className={styles.actionBtn}>
                      <InlineSVG src={Delete} width={14} height={14} className={'mr-2'} />
                      Xóa
                    </Button>
                  </div> :''
              }
            </>
          } color={'white'} trigger={'click'} open={openAction} onClick={() => setOpenAction(!openAction)}
                    className={`cursor-pointer ${props.className} z-0`}>
            <div className={styles.optionsWrap}>
              <InlineSVG src={OptionsIcon} width={14} height={14} className={`rotate-[-90deg]`} />
            </div>
          </Tooltip>
        </div>
      </div>
      <p><strong>Code:</strong> {props.project.code}</p>
      <p className={`break-all`}><strong>Secret key:</strong> {props.project.secret_key}</p>
    </Card>
  )
}

export default cardProject;