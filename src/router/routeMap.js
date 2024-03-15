import React from 'react';
import {PERMISSIONS} from '@/utils/constains';
import OverviewIcon from '@/assets/images/icons/menu/overview.svg';
import AccountIcon from '@/assets/images/icons/menu/account.svg';
import UsersIcon from '@/assets/images/icons/menu/users.svg';
import ProjectIcon from '@/assets/images/icons/menu/project.svg'

import InlineSVG from 'react-inlinesvg';

export const routeMap = [
    // {
    //     label: 'Home',
    //     icon: (<InlineSVG src={OverviewIcon} />),
    //     path: '/',
    //     routeActive: ['/']
    // },

    {
        label: 'Admin Management',
        icon: (<InlineSVG src={AccountIcon} alt='' />),
        path: '/admin-management',
        routeActive: ['/admin-management'],
        permissions: [PERMISSIONS.SUPER.SUPER_ADMIN]
    },

    {
        label: 'My Project',
        icon: (<InlineSVG src={ProjectIcon} alt='' />),
        path: '/my-project',
        routeActive: ['/my-project'],
        // permissions: [PERMISSIONS.LIST.ADMIN]
    },
];
