import React from 'react';
import {PERMISSIONS} from '@/utils/constains';
import OverviewIcon from '@/assets/images/icons/menu/overview.svg';
import AccountIcon from '@/assets/images/icons/menu/account.svg';
import UsersIcon from '@/assets/images/icons/menu/users.svg';
import InlineSVG from 'react-inlinesvg';

export const routeMap = [
    {
        label: 'Tổng quan',
        icon: (<InlineSVG src={OverviewIcon} />),
        path: '/',
        routeActive: ['/']
    },
    {
        label: 'Quản lý người dùng',
        icon: (<InlineSVG src={UsersIcon} />),
        path: '/users',
        routeActive: ['/users']
    },
    {
        label: 'Quản lý tài khoản',
        icon: (<InlineSVG src={AccountIcon} alt='' />),
        path: '/account-management',
        routeActive: ['/account-management'],
        permissions: [PERMISSIONS.LIST.USERS]
    }
];
