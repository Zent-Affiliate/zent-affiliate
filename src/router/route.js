import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from "./rootLoader.js";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Home from "@/pages/Home";
import User from '@/pages/User/index.jsx';
import Project from '@/pages/Project/index.jsx';
import Server from '@/pages/Server/index.jsx';
import Config from '@/pages/Config/index.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/',
    element: <Home/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/users',
    element: <User/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_USER_PAGE'
    )
  },
  {
    path: '/projects',
    element: <Project/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_PROJECT_PAGE'
    )
  },
  {
    path: '/servers',
    element: <Server/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_SERVER_PAGE'
    )
  },
  {
    path: '/configs',
    element: <Config/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_CONFIG_PAGE'
    )
  }
]);

export default router;
