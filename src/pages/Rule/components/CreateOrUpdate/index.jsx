import React from 'react';
import {useDispatch} from 'react-redux';

import {Button, Input, InputNumber, Select} from 'antd';
import Handle from '@/pages/Rule/components/CreateOrUpdate/handle.js';
import InlineSVG from 'react-inlinesvg';
import styles from './styles.module.scss';
import {setVisibleModalCreateOrUpdate} from '@/states/modules/rule/index.js';
import {RULE_CONFIG} from '@/utils/constants.js';
import IconDeleteTable from '@/assets/images/icons/duotone/trash-can.svg';
import CoinsIcon from '../../../../assets/images/icons/duotone/coins.svg';
import PercentIcon from '../../../../assets/images/icons/duotone/percent.svg';
import IconWarning from '@/assets/images/icons/light/warning.svg';

// import PlusIcon from '../../../../assets/images/icons/solid/plus.svg';

function CreateOrUpdate(props) {
    const {isCreateRule} = props;
    const dispatch = useDispatch();
    const {
        rule,
        errorCreateOrUpdate,
        typeSelection,
        isLoadingBtnCreateRule,
        isLoadingBtnUpdateRule,

        onChangeForm,
        handleChangeSelectRuleType,
        handleAddLevel,
        handleRemoveLevel,
        formatNumber,
        handleSubmitForm
    } = Handle();

    return (
        <>
            <div className={`input-wrap !mb-[15px]`}>
                <div className={'label-wrap'}>
                Convention name <span className={'required'}></span>
                </div>
                <Input
                    className={`main-input`}
                    value={rule.name}
                    onChange={(e) => onChangeForm(e.target.value, 'name')}
                    placeholder={'Enter name'}
                />
                {
                    errorCreateOrUpdate && errorCreateOrUpdate.name?.length > 0 ?
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
                Convention code <span className={'required'}></span>
                </div>
                <Input
                    className={`main-input`}
                    value={rule.code}
                    onChange={(e) => onChangeForm(e.target.value, 'code')}
                    placeholder={'Enter code'}
                />
                {
                    errorCreateOrUpdate && errorCreateOrUpdate.code ?
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
                        <div>Calculation type and value<span className={'required'}></span></div>
                        <div className={'flex justify-between items-center cursor-pointer hover:text-[#4096ff]'}>
                            {/*<InlineSVG src={PlusIcon} width={11} height={11} className={'opacity-[0.5]'} />*/}
                            <div className={'text-[12px] hover:text-[#4096ff]'} onClick={handleAddLevel}>&nbsp;Add
                                level
                            </div>
                        </div>
                    </div>

                    <div className='py-2 pl-2 pr-4 overflow-y-auto max-h-[280px]'>
                        {
                            rule.configs?.map((config, index) => {
                                return (
                                    <div key={config?._id}>
                                        <div
                                            className={`flex justify-between items-center ${index !== rule.configs.length - 1 ? 'mb-3' : ''}`}>
                                            <div className={'flex items-center'}>
                                                <p className={'w-10 mr-2'}>Lv {index + 1}</p>
                                                <Select
                                                    placeholder='Select calculation type'
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
                                                placeholder={'Value'}
                                                suffix={
                                                    <div>{config.type === RULE_CONFIG.PERCENT ?
                                                        <InlineSVG src={PercentIcon} width={14} height={14} /> :
                                                        <InlineSVG src={CoinsIcon} width={14} height={14} />}
                                                    </div>
                                                }
                                                min={0}
                                                max={9999999999999}
                                                onScroll={() => {
                                                }}
                                                controls={false}
                                                formatter={value => formatNumber(value)}
                                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                            />
                                            {
                                                rule.configs?.length > 1 ?
                                                    <InlineSVG src={IconDeleteTable}
                                                               className={`w-[15px] h-[15px] ml-2 cursor-pointer`}
                                                               alt='' onClick={() => handleRemoveLevel(index)} /> : ''
                                            }
                                        </div>
                                        {
                                            errorCreateOrUpdate && errorCreateOrUpdate[`configs.${index}.value`] && errorCreateOrUpdate[`configs.${index}.value`]?.length > 0 ?
                                                <span className={'error mb-2 ml-[-8px]'}>
                                                    <div className={'icon'}>
                                                        <InlineSVG src={IconWarning} width={14} height='auto' />
                                                    </div>
                                                    {errorCreateOrUpdate[`configs.${index}.value`]}
                                                </span> : ''
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.btnWrap}>
                <div>
                    <Button
                        loading={isCreateRule ? isLoadingBtnCreateRule : isLoadingBtnUpdateRule}
                        onClick={() => handleSubmitForm(isCreateRule)}
                        className={`main-btn-primary mr-2`} type={'primary'} size={'large'}>
                        {isCreateRule ? 'Create' : 'Update'}
                    </Button>
                    <Button
                        onClick={() => dispatch(setVisibleModalCreateOrUpdate(false))}
                        className={`ant-btn-close`}
                        size={'large'}>
                        Close
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateOrUpdate;