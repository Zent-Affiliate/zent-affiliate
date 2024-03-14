import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from './rootLoader.js';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import User from '@/pages/User/index.jsx';
import Commission from '@/pages/User/components/Commission/index.jsx';
import Rule from '@/pages/Rule/index.jsx';
import Admins from '@/pages/Admin/index.jsx';
import Project from '@/pages/Project/index.jsx';
import {PERMISSIONS} from '@/utils/constants.js';
import ProjectAdmin from '@/pages/ProjectAdmin/index.jsx';
import ProjectDetail from '@/pages/ProjectDetail/index.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/',
        element: <Home />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_HOME_PAGE'
        )
    },
    {
        path: '/admin-management',
        element: <Admins />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_ADMIN_PAGE', [PERMISSIONS.SUPER.SUPER_ADMIN]
        )
    },

    {
        path: '/:admin_id/projects',
        element: <ProjectAdmin />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_ADMIN_PAGE', [PERMISSIONS.SUPER.SUPER_ADMIN]
        )
    },

    {
        path: '/project-detail/:project_id',
        element: <ProjectDetail />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_DETAIL_PAGE'
        )
    },
    {
        path: '/project-detail/:project_id/users/:id',
        element: <Commission />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_COMMISSION_PAGE'
        )
    },
    {
        path: '/my-project-detail/:project_id',
        element: <ProjectDetail />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_DETAIL_PAGE'
        )
    },
    {
        path: '/my-project',
        element: <Project />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_PAGE'
        )
    },
    {
        path: '/my-project-detail/:project_id/users',
        element: <User />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_USER_PAGE'
        )
    },
    {
        path: '/my-project-detail/:project_id/users/:id',
        element: <Commission />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_COMMISSION_PAGE'
        )
    },
    {
        path: '/my-project-detail/:project_id/rule-config',
        element: <Rule />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_RULE_SAGA'
        )
    }
]);

export default router;
