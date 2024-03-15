import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from './rootLoader.js';
import Login from '@/pages/Auth/Login';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';
import Home from '@/pages/Home';
import Admins from '@/pages/Admin/index.jsx';
import Project from '@/pages/Project/index.jsx';
import { PERMISSIONS } from '@/utils/constains.js';
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
    // {
    //     path: '/forgot-password',
    //     element: <ForgotPassword />,
    //     loader: ({request, params}) => rootLoader(
    //         {request, params}, false, 'LOAD_AUTH_PAGE'
    //     )
    // },
    // {
    //     path: '/reset-password',
    //     element: <ResetPassword />,
    //     loader: ({request, params}) => rootLoader(
    //         {request, params}, false, 'LOAD_AUTH_PAGE'
    //     )
    // },
    {
        path: '/',
        element: <Home/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_HOME_PAGE'
        )
    },
    {
        path: '/admin-management',
        element: <Admins/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_ADMIN_PAGE',[PERMISSIONS.SUPER.SUPER_ADMIN]
        )
    },

    {
        path: '/projects/:admin_id',
        element: <ProjectAdmin/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_ADMIN_PAGE',[PERMISSIONS.SUPER.SUPER_ADMIN]
        )
    },

    {
        path: '/projectDetail/:project_id',
        element: <ProjectDetail/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, ''
        )
    },
    
    {
        path: '/my-project',
        element: <Project/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_PROJECT_PAGE',
        )
    }
]);

export default router;
