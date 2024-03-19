import React from 'react';
import styles from './styles.module.scss';
import {Drawer, Tabs} from 'antd';
import Handle from './handle.js';
import Information from './components/Information';
import ChangePassword from './components/ChangePassword';
import InlineSVG from 'react-inlinesvg';
import Close from '@/assets/images/icons/duotone/times.svg';
import './styles.scss';
import TitleInformation
    from '@/layouts/MainLayout/Header/components/PopoverProfile/components/TitleInformation/index.jsx';
import ImageUser from '@/assets/images/logos/user_default.png';

function PopoverProfile() {
    const {
        isShowInformation,
        setIsShowInformation,
        me,
        handleConfirmLogout,
        handleShowProfile,
        handleResetError,
        handleClearError
    } = Handle();

    const items = [
        {
            key: '1',
            label: 'Update',
            children: <Information handleResetError={handleResetError} />
        },
        {
            key: '2',
            label: 'Change the password',
            children: <ChangePassword handleResetError={handleResetError} />
        }
    ];

    return (
        <div className={styles.modalInfoWrap}>
            <div className={styles.personalInformationWrap}>
                <div className={'w-[40px] h-[40px] rounded-[10px] mr-1'}>
                    <img
                        crossOrigin='anonymous'
                        src={me.avatar ? me.avatar : ImageUser}
                        alt='Avatar'
                        className={'w-full h-full rounded-[10px] object-cover'}
                    />
                </div>
                <div className={'ml-1'}>
                    <div className={styles.name}>
                        {me.name}
                    </div>
                    <div className={styles.role}>
                        {me.email || 'Not update'}
                    </div>
                </div>
            </div>
            <div className={styles.mainModalInfoWrap}>
                <ul className={styles.menuInfoWrap}>
                    <li
                        onClick={() => handleShowProfile()}
                        className={`${styles.itemInfoWrap}`}
                    >
                        <div>
                            <span className={styles.text}>Personal information</span>
                        </div>
                    </li>
                    <li
                        onClick={() => handleConfirmLogout()}
                        className={styles.itemInfoWrap}
                    >
                        <div>
                            <span className={styles.text}>Log out</span>
                        </div>
                    </li>
                </ul>
            </div>

            <Drawer
                title={<TitleInformation />}
                placement={'right'}
                className={'drawerInformation'}
                closable={true}
                onClose={() => setIsShowInformation(false)}
                open={isShowInformation}
                key={'right'}
                width={520}
                closeIcon={<div className={'absolute top-[30px]'}><InlineSVG src={Close} /></div>}
            >
                <Tabs onChange={() => handleClearError()} defaultActiveKey='1' items={items} />
            </Drawer>
        </div>
    );
}

export default PopoverProfile;
