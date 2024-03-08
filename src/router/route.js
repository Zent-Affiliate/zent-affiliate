import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from './rootLoader.js';
import Login from '@/pages/Auth/Login';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';
import Home from '@/pages/Home';
import User from '@/pages/User/index.jsx';
import Commission from '@/pages/User/components/Commission/index.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        loader: ({request, params}) => rootLoader(
            {request, params}, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
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
        path: '/users',
        element: <User />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_USER_PAGE'
        )
    },
    {
        path: '/users/:id',
        element: <Commission />,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_COMMISSION_PAGE'
        )
    }
]);

export default router;
