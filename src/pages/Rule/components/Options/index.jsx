import {Button, Tooltip} from 'antd';
import styles from './styles.module.scss';
import InlineSVG from 'react-inlinesvg';
import Edit from '@/assets/images/icons/duotone/pencil.svg';
import Delete from '@/assets/images/icons/duotone/trash-can.svg';
import OptionsIcon from '@/assets/images/icons/regular/options.svg';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

function Options(props) {
    const [visibleTooltip, setVisibleTooltip] = useState(false);
    const visibleModalCreateOrUpdate = useSelector(state => state.rule.visibleModalCreateOrUpdate);
    const visibleModalDelete = useSelector(state => state.rule.visibleModalDelete);

    useEffect(() => {
        if (visibleModalCreateOrUpdate || visibleModalDelete) {
            setVisibleTooltip(false);
        }
    }, [visibleModalCreateOrUpdate, visibleModalDelete]);

    return (
        <Tooltip title={
            <>
                <div className={`btn-edit mb-1`} onClick={props.handleOnClickUpdate}>
                    <Button className={styles.actionBtn}>
                        <InlineSVG src={Edit} width={14} height={14} className={'mr-2'} />
                        Update
                    </Button>
                </div>
                <div className={`btn-delete`} onClick={props.handleOnClickDelete}>
                    <Button className={styles.actionBtn}>
                        <InlineSVG src={Delete} width={14} height={14} className={'mr-2'} />
                        Close
                    </Button>
                </div>
            </>
        } color={'white'} trigger={'click'} open={visibleTooltip} onClick={() => setVisibleTooltip(!visibleTooltip)}
                 className={`cursor-pointer ${props.className} z-0`}>
            <div className={styles.optionsWrap}>
                <InlineSVG src={OptionsIcon} width={14} height={14} className={`rotate-[-90deg]`} />
            </div>
        </Tooltip>
    );
}

export default Options;