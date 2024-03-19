import React from 'react';
import {PERMISSIONS} from '@/utils/constants.js';
import AccountIcon from '@/assets/images/icons/menu/account.svg';
import UsersIcon from '@/assets/images/icons/menu/users.svg';
import ProjectIcon from '@/assets/images/icons/menu/project.svg';
import RewardIcon from '@/assets/images/icons/menu/reward.svg';
import InlineSVG from 'react-inlinesvg';

export const routeMap = [
    {
        label: 'Admin Management',
        icon: (<InlineSVG src={AccountIcon} alt='' />),
        path: '/admin-management',
        routeActive: [
            '/admin-management',
            '/:admin_id/projects',
            '/project-detail/:project_id',
            '/project-detail/:project_id/users/:id',
        ],
        permissions: [PERMISSIONS.SUPER.SUPER_ADMIN]
    },

    {
        label: 'My Project',
        icon: (<InlineSVG src={ProjectIcon} alt='' />),
        path: '/my-project',
        routeActive: [
            '/my-project',
            '/my-project-detail/:project_id',
            '/my-project-detail/:project_id/users',
            '/my-project-detail/:project_id/users/:id',
        ],
        permissions: [PERMISSIONS.SUPER.SUPER_ADMIN]
    },
    {
        label: 'List of customers',
        icon: (<InlineSVG src={UsersIcon} />),
        path: '/my-project-detail/:project_id/users',
        routeActive: ['/my-project-detail/:project_id/users', '/my-project-detail/:project_id/users/:id'],
        exceptPermissions: [PERMISSIONS.SUPER.SUPER_ADMIN]
    },
    {
        label: 'Compensation configuration',
        icon: (<InlineSVG src={RewardIcon} alt='' />),
        path: '/my-project-detail/:project_id/rule-config',
        routeActive: ['/my-project-detail/:project_id/rule-config'],
        exceptPermissions: [PERMISSIONS.SUPER.SUPER_ADMIN]
    }
];
