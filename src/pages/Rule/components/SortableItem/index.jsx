import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import Handle from '@/pages/Rule/components/SortableItem/handle.js';
import styles from './styles.module.scss';
import DragIcon from '../../../../assets/images/icons/solid/drag.svg';
import InlineSVG from 'react-inlinesvg';
import HandleCreate from '../CreateOrUpdate/handle.js';
import {CSS} from '@dnd-kit/utilities';
import '../../styles.scss';
import {InputNumber, Select} from 'antd';
import {RULE_CONFIG} from '@/utils/constants.js';
import DeleteIcon from '../../../../assets/images/icons/duotone/xmark.svg';
import Edit from '@/assets/images/icons/duotone/pencil.svg';
import AcceptIcon from '@/assets/images/icons/duotone/circle-check.svg';
import CancelIcon from '@/assets/images/icons/duotone/circle-xmark.svg';

function SortableItem(props) {
    const {formatNumber, typeSelection} = HandleCreate();
    const {
        activeConfig,
        handleChangeInCard,
        handleOpenConfirmDeleteConfig,
        handleEnableEdit,
        handleUpdateConfig,
        handleCancelUpdate
    } = Handle();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id: props.item});

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'grab'
    } : undefined;

    const item = props.item;

    return (
        <div ref={setNodeRef} style={style} {...attributes}
             className={`${styles.itemWrapper} !cursor-default`}>
            <div className={`relative border-2 rounded-md flex items-center justify-start text-[13px] pr-[50px] py-2 pl-2
                    ${isDragging ? 'opacity-60' : ''} ${props.index !== (props.length - 1) ? 'mb-3' : ''}`}
            >
                <div className={'ml-3 w-[170px]'}>
                    <div className={'flex justify-between'}>
                        <span className={'flex'}>
                            <span className={'font-semibold'}>Value: </span>&nbsp;
                            {
                                (activeConfig && (activeConfig?._id === props.id)) ?
                                    <InputNumber
                                        className={`input-custom ${activeConfig?.type === RULE_CONFIG.PERCENT ? 'w-[102px]' : ''}`}
                                        defaultValue={null}
                                        value={activeConfig?.value}
                                        onChange={(e) => handleChangeInCard(e, 'value')}
                                        placeholder={'Value'}
                                        min={0}
                                        max={9999999999999}
                                        onScroll={() => {
                                        }}
                                        controls={false}
                                        formatter={value => formatNumber(value)}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    /> :
                                    <span>{formatNumber(item?.value)}</span>
                            }
                        </span>
                    </div>
                    <div className={'flex mt-2'}>
                        <span className={'font-semibold'}>Type:</span> &nbsp;
                        <span className={'flex w-[38%]'}>
                            {
                                (activeConfig && (activeConfig?._id === props.id)) ?
                                    <Select
                                        className={`select-custom`}
                                        value={activeConfig?.type}
                                        options={typeSelection.map((item) => ({
                                            value: item.value,
                                            label: item.label
                                        }))}
                                        onChange={(e) => handleChangeInCard(e, 'type')}
                                    />
                                    : <span>{item?.type === RULE_CONFIG.PERCENT ? 'Percent' : 'Fixed'}</span>
                            }
                        </span>
                    </div>
                </div>

                <div className={'flex absolute right-2'}>
                    {
                        (activeConfig && (activeConfig?._id === props.id)) ?
                            <div className={styles.actionBtn}>
                                <div className={styles.cancelIcon} onClick={handleCancelUpdate}>
                                    <InlineSVG src={CancelIcon} width={20} height={20} className={'mr-2'} />
                                </div>
                                <div className={styles.acceptIcon} onClick={handleUpdateConfig}>
                                    <InlineSVG src={AcceptIcon} width={20} height={20} className={'mr-2'} />
                                </div>
                            </div>
                            : <>
                                <div className={`${styles.editIcon}`}
                                     onClick={() => handleEnableEdit(props.rule, item, props.index)}>
                                    <InlineSVG src={Edit} width={14} height={14} />
                                </div>
                                {
                                    props.rule.configs?.length > 1 ?
                                        <div className={styles.deleteIcon}
                                             onClick={() => handleOpenConfirmDeleteConfig(props.rule, props.index)}>
                                            <InlineSVG src={DeleteIcon} width={'14px'} height={'14px'} />
                                        </div>
                                        : ''
                                }
                                <div {...listeners} className={`${styles.itemDrag} !cursor-grab`}>
                                    <InlineSVG src={DragIcon} width={14} height={14} />
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default SortableItem;