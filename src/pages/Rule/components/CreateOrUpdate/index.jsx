import React from 'react';
import {useDispatch} from 'react-redux';

import {Button, Input, InputNumber, Select} from 'antd';
import Handle from '@/pages/Rule/components/CreateOrUpdate/handle.js';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '../../../../assets/images/icons/notification/warning_16x16.svg';
import styles from './styles.module.scss';
import {setVisibleModalCreateOrUpdate} from '@/states/modules/rule/index.js';
import {RULE_CONFIG} from '@/utils/constants.js';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';

// import PlusIcon from '../../../../assets/images/icons/solid/plus.svg';

function CreateOrUpdate(props) {
    const {isCreateRule} = props;
    const dispatch = useDispatch();
    const {
        rule,
        errorCreateOrUpdate,
        typeSelection,

        onChangeForm,
        handleChangeSelectRuleType,
        handleAddLevel,
        handleRemoveLevel,
        formatNumber
    } = Handle();

    return (
        <>
            <div className={`input-wrap !mb-[15px]`}>
                <div className={'label-wrap'}>
                    Tên quy ước <span className={'required'}></span>
                </div>
                <Input
                    className={`main-input`}
                    value={rule.name}
                    onChange={(e) => onChangeForm(e.target.value, 'name')}
                    placeholder={'Nhập tên quy ước'}
                />
                {
                    errorCreateOrUpdate && errorCreateOrUpdate.name.length > 0 ?
                        <span className={'error'}>
                        <div className={'icon'}>
                            <InlineSVG src={IconWarning} width={14} height='auto' />
                        </div>
                            {errorCreateOrUpdate.name}
                    </span> : ''
                }
            </div>
            <div className={`input-wrap !mb-[15px]`}>
                <div className={'label-wrap'}>
                    Mã quy ước <span className={'required'}></span>
                </div>
                <Input
                    className={`main-input`}
                    value={rule.code}
                    onChange={(e) => onChangeForm(e.target.value, 'code')}
                    placeholder={'Nhập mã quy ước'}
                />
                {
                    errorCreateOrUpdate && errorCreateOrUpdate.code.length > 0 ?
                        <span className={'error'}>
                        <div className={'icon'}>
                            <InlineSVG src={IconWarning} width={14} height='auto' />
                        </div>
                            {errorCreateOrUpdate.code}
                    </span> : ''
                }
            </div>

            <div className={'pr-3'}>
                <div className={`input-wrap !mb-[15px]`}>
                    <div className={'label-wrap flex justify-between items-center'}>
                        <div>Kiểu tính toán và giá trị<span className={'required'}></span></div>
                        <div className={'flex justify-between items-center cursor-pointer hover:text-[#4096ff]'}>
                            {/*<InlineSVG src={PlusIcon} width={11} height={11} className={'opacity-[0.5]'} />*/}
                            <div className={'text-[12px] hover:text-[#4096ff]'} onClick={handleAddLevel}>&nbsp;Thêm
                                cấp độ
                            </div>
                        </div>
                    </div>

                    <div className='py-2 pl-2 pr-4 overflow-y-auto max-h-[280px]'>
                        {
                            rule.configs.map((config, index) => (
                                <div key={config?._id}
                                     className={`flex justify-between items-center ${index !== rule.configs.length - 1 ? 'mb-3' : ''}`}>
                                    <div className={'flex items-center'}>
                                        <p className={'w-10 mr-2'}>Lv {index + 1}</p>
                                        <Select
                                            placeholder='Chọn kiểu tính toán'
                                            className={`main-select w-[170px]`}
                                            value={config.type}
                                            options={typeSelection.map((item) => ({
                                                value: item.value,
                                                label: item.label
                                            }))}
                                            onChange={(e) => handleChangeSelectRuleType(e, index)}
                                        />
                                    </div>
                                    <InputNumber
                                        className={`main-input-number w-[230px]`}
                                        defaultValue={null}
                                        value={config.value}
                                        onChange={(e) => onChangeForm(e, 'value', index)}
                                        placeholder={'Giá trị'}
                                        suffix={<div>{config.type === RULE_CONFIG.PERCENT ? '%' : 'VNĐ'}</div>}
                                        min={0}
                                        max={9999999999999}
                                        onScroll={() => {
                                        }}
                                        controls={false}
                                        formatter={value => formatNumber(value)}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                    {
                                        rule.configs.length > 1 ?
                                            <InlineSVG src={IconDeleteTable}
                                                       className={`w-[15px] h-[15px] ml-2 cursor-pointer`}
                                                       alt='' onClick={() => handleRemoveLevel(index)} /> : ''
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.btnWrap}>
                <div>
                    <Button
                        onClick={() => dispatch(setVisibleModalCreateOrUpdate(false))}
                        className={`ant-btn-close mr-2`}
                        size={'large'}>
                        Đóng
                    </Button>
                    <Button
                        // loading={isLoadingBtn}
                        // onClick={() => handleSubmitForm(isCreateLesson)}
                        className={`main-btn-primary`} type={'primary'} size={'large'}>
                        {isCreateRule ? 'Tạo mới' : 'Cập nhật'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateOrUpdate;