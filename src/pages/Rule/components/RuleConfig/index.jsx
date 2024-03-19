import React from 'react';
import {Card} from 'antd';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import SortableItem from '@/pages/Rule/components/SortableItem/index.jsx';
import {closestCenter, DndContext} from '@dnd-kit/core';
import Handle from '@/pages/Rule/components/RuleConfig/handle.js';
import '../../styles.scss';
import Options from '@/pages/Rule/components/Options/index.jsx';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {copyToClipboard} from '@/utils/helper.js';
import InlineSVG from 'react-inlinesvg';
import IconCopy from '@/assets/images/icons/duotone/copy.svg';
import styles from './styles.module.scss';

function RuleConfig(props) {
    const rule = props.record;

    const {
        handleDragEnd,
        handleShowModalUpdateRule,
        handleShowModalDeleteRule
    } = Handle();

    return (
        <>
            <Card
                key={rule._id}
                title={
                    <div className={styles.titleWrap}>
                        <div>{rule.name}</div>
                        <div className={'text-sm text-[#99a1b7]'}>
                            <span className={'mr-2'}>{rule.code}</span>
                            <button onClick={() => copyToClipboard(rule.code)}
                                    className={`${styles.copyIcon} !fill-[#99A1B7] hover:!fill-blue-60`}>
                                <InlineSVG src={IconCopy} className={`w-[14px] h-[14px]`} alt='' />
                            </button>
                        </div>
                    </div>
                }
                extra={
                    <Options
                        handleOnClickUpdate={() => handleShowModalUpdateRule(rule)}
                        handleOnClickDelete={() => handleShowModalDeleteRule(rule)}
                    />
                }
                className={'rule-card-custom'}
            >
                <DndContext key={rule._id} collisionDetection={closestCenter}
                            onDragEnd={(event) => handleDragEnd(event, rule)}
                            modifiers={[restrictToVerticalAxis]}
                >
                    <SortableContext items={rule.configs || []} strategy={verticalListSortingStrategy}>
                        {
                            rule.configs?.map((item, index) => (
                                <div key={item._id} className={'flex justify-center items-center'}>
                                    <div
                                        className={`flex font-semibold w-20 ${(index !== rule.configs?.length - 1) ? 'mb-3' : 'mb-1'}`}>
                                        Lv {index + 1}
                                    </div>
                                    <SortableItem item={item} id={item._id} index={index} rule={rule}
                                                  length={rule.configs?.length} />
                                </div>
                            ))
                        }
                    </SortableContext>
                </DndContext>
            </Card>
        </>
    );
}

export default RuleConfig;