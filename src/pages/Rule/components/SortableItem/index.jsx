import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {RULE_CONFIG} from '@/utils/constants.js';
import Handle from '@/pages/Rule/components/SortableItem/handle.js';
import styles from './styles.module.scss';
import DragIcon from '../../../../assets/images/icons/solid/drag.svg';
import InlineSVG from 'react-inlinesvg';
import HandleCreate from '../CreateOrUpdate/handle.js';
import DeleteIcon from '../../../../assets/images/icons/solid/xmark.svg';
import {CSS} from '@dnd-kit/utilities';

function SortableItem(props) {
    const {formatNumber} = HandleCreate();
    const {
        handleOpenConfirmDeleteConfig
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
                        <span>
                            <span className={'font-semibold'}>Value: </span>
                            <span>{formatNumber(item.value)}</span>
                        </span>
                    </div>
                    <div>
                        <span className={'font-semibold'}>Calculation type: </span>
                        <span>{item.type === RULE_CONFIG.PERCENT ? 'Phần trăm' : 'Cố định'}</span>
                    </div>
                </div>

                <div className={'flex absolute right-2'}>
                    {
                        props.rule.configs?.length > 1 ?
                            <div className={styles.deleteIcon}
                                 onClick={() => handleOpenConfirmDeleteConfig(props.rule, props.index)}>
                                <InlineSVG src={DeleteIcon} width={13} height={13} />
                            </div> : ''
                    }
                    <div {...listeners} className={`${styles.itemDrag} !cursor-grab`}>
                        <InlineSVG src={DragIcon} width={14} height={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortableItem;