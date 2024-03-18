import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Col, Input, Pagination, Row} from 'antd';
import Handle from '@/pages/Rule/handle.js';
import InlineSVG from 'react-inlinesvg';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import RuleConfig from '@/pages/Rule/components/RuleConfig/index.jsx';
import styles from './styles.module.scss';
import CreateOrUpdate from '@/pages/Rule/components/CreateOrUpdate/index.jsx';
import ModalDefault from '@/components/Modal/index.jsx';
import {setVisibleModalCreateOrUpdate, setVisibleModalDelete} from '@/states/modules/rule/index.js';
import ModalDeleteDefault from '@/components/ModalDelete/index.jsx';
import MainLayout from '@/layouts/MainLayout/index.jsx';

function Rule() {
    const {
        rule,
        rules,
        isCreateRule,
        isLoadingGetRule,
        isLoadingBtnDeleteRule,
        visibleModalCreateOrUpdate,
        visibleModalDelete,
        isMyProjectDetail,

        handleShowModalCreateRule,
        handleSearchRule,
        handleDragEnd
    } = Handle();
    const dispatch = useDispatch();

    const content = <div>
        <div
            className={`bg-white rounded-lg border shadow-sm ${isMyProjectDetail ? 'h-[calc(100vh_-_200px)]' : 'h-[calc(100vh_-_265px)]'}`}>
            <div className={`py-8 px-8`}>
                <div className={`flex justify-between mb-2.5`}>
                    <div className={`w-96`}>
                        <Input
                            // value={dataFilter.keySearch}
                            // onKeyDown={(e) => handleEnterSearchUser(e)}
                            // onChange={(e) => handleSearchUser(e.target.value)}
                            prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                            className={`main-input`}
                            placeholder='Tìm kiếm theo mã, tên quy ước'
                        />
                    </div>

                    <div>
                        <Button className={`flex items-center ant-btn-primary h-full`}
                                onClick={handleShowModalCreateRule}>
                            Tạo mới
                        </Button>
                    </div>
                </div>

                <div
                    className={`${styles.ruleListWrap} 
                        ${isMyProjectDetail ? 'max-h-[calc(100vh_-_390px)]' : 'max-h-[calc(100vh_-_460px)]'} main-select`}>
                    <Row gutter={[26, 24]}>
                        {
                            rules.map(rule => (
                                <Col key={rule._id} className='gutter-row' span={6}>
                                    <RuleConfig record={rule} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                <Pagination
                    className={'absolute right-10'}
                />
            </div>
        </div>

        <ModalDefault
            isModalOpen={visibleModalCreateOrUpdate}
            handleOk={() => dispatch(setVisibleModalCreateOrUpdate(!visibleModalCreateOrUpdate))}
            handleCancel={() => dispatch(setVisibleModalCreateOrUpdate(false))}
            title={isCreateRule ? 'Tạo mới quy ước' : 'Cập nhật quy ước'}
        >
            <CreateOrUpdate
                isCreateRule={isCreateRule}
            />
        </ModalDefault>

        <ModalDeleteDefault
            loading={isLoadingBtnDeleteRule}
            isModalOpen={visibleModalDelete}
            handleCancel={() => dispatch(setVisibleModalDelete(false))}
            // handleConfirm={() => dispatch(handleDeleteRule(rule._id))}
            content={
                <div>
                    Bạn có chắn chắn muốn xóa quy ước <strong>{rule.name}</strong> không?
                </div>
            }
            contentBtn='Xóa'
        />
    </div>;

    return (isMyProjectDetail ? <MainLayout>{content}</MainLayout> : content);
}

export default Rule;