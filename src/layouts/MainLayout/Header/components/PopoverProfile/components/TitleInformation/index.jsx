import {Col, Row} from 'antd';
import emailIcon from '@/assets/images/icons/duotone/emailSvgIcon.svg';
import phoneIcon from '@/assets/images/icons/duotone/phone-svg.svg';
import InlineSVG from 'react-inlinesvg';
import React from 'react';
import handle from './handle.js';
import './styles.scss';
import ImageUser from '@/assets/images/logos/user_default.png';

const TitleInformation = (props) => {
    const {
        me
    } = handle(props);

    return (
        <>
            <Row>
                <Col span={6}>
                    <img
                        className={'w-[100px] h-[100px] rounded-[0.8em] object-cover'}
                        src={me.avatar ? me.avatar : ImageUser} alt=''
                    />
                </Col>
                <Col className={'pt-2 leading-2'}>
                    <div className={'text-l'}>
                        {me.name}
                    </div>
                    <div className={'flex text-[13px] font-medium text-[#99A1B7]'}>
                        <label
                            className={`flex justify-center items-center !fill-[#99A1B7]`}
                            htmlFor='imageUpload'
                        >
                            <InlineSVG src={emailIcon} alt='' className={`w-3.5 h-3.5`} />
                        </label>
                        <a href={`mailto:${me.email}`} className={'ml-1'}>
                            {me.email}
                        </a>
                    </div>
                    <div className={'flex text-[13px] font-medium text-[#99A1B7]'}>
                        <label
                            className={`flex justify-center items-center !fill-[#99A1B7]`}
                            htmlFor='imageUpload'
                        >
                            <InlineSVG src={phoneIcon} alt='' className={`w-3.5 h-3.5`} />
                        </label>
                        {
                            me.phone ?
                                <a href={`tel:${me?.phone}`} className={'ml-1'}>
                                    {me.phone}
                                </a> :
                                <span className='italic ml-1'>Đang cập nhật</span>
                        }
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TitleInformation;
