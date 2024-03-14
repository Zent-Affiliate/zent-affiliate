import React from 'react';
import {Card} from 'antd';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import SortableItem from '@/pages/Rule/components/SortableItem/index.jsx';
import {closestCenter, DndContext} from '@dnd-kit/core';
import Handle from '@/pages/Rule/components/RuleConfig/handle.js';
import '../../styles.scss';
import Options from '@/pages/Rule/components/Options/index.jsx';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

function RuleConfig(props) {
    const rule = props.record;

    const {
        handleDragEnd,
        handleShowModalUpdateRule,
        handleShowModalDeleteRule
    } = Handle();

    return (
        <Card
            key={rule._id}
            title={
                <>
                    <div>{rule.name}</div>
                    <div className={'text-sm text-[#99a1b7]'}>{rule.code}</div>
                </>
            }
            extra={
                <Options
                    handleOnClickUpdate={() => handleShowModalUpdateRule(rule)}
                    handleOnClickDelete={() => handleShowModalDeleteRule(rule)}
                />
            }ze
            className={'rule-card-custom'}
        >
            <DndContext key={rule._id} collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDragEnd(event, rule)}
                        modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext items={rule.configs || []} strategy={verticalListSortingStrategy}>
                    {
                        rule.configs.map(item => (
                            <SortableItem key={item._id} item={item} id={item._id}/>
                        ))
                    }
                </SortableContext>
            </DndContext>
        </Card>
    );
}

export default RuleConfig;