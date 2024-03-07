import React from "react";
import {PERMISSIONS} from "@/utils/constains";
import OverviewIcon from "@/assets/images/icons/menu/overview.svg";
import AccountIcon from "@/assets/images/icons/menu/account.svg";
import UsersIcon from "@/assets/images/icons/menu/users.svg";
import ServerIcon from "@/assets/images/icons/menu/server.svg";
import InlineSVG from "react-inlinesvg";
import ProjectIcon from "@/assets/images/icons/menu/project.svg";
import ConfigIcon from "@/assets/images/icons/menu/config.svg";

export const routeMap = [
  {
    label: 'Tổng quan',
    icon: (<InlineSVG src={OverviewIcon}/>),
    path: '/',
    routeActive: ['/'],
  },
  {
    label: 'Quản lý máy chủ',
    icon: (<InlineSVG src={ServerIcon}/>),
    path: '/servers',
    routeActive: ['/servers']
  },
  {
    label: 'Quản lý dự án',
    icon: (<InlineSVG src={ProjectIcon}/>),
    path: '/projects',
    routeActive: ['/projects'],
  },
  {
    label: 'Quản lý người dùng',
    icon: (<InlineSVG src={UsersIcon}/>),
    path: '/users',
    routeActive: ['/users'],
  },
  {
    label: 'Quản lý tài khoản',
    icon: (<InlineSVG src={AccountIcon} alt=""/>),
    path: '/account-management',
    routeActive: ['/account-management'],
    permissions: [PERMISSIONS.LIST.USERS],
  },
  {
    label: 'Cấu hình',
    icon: (<InlineSVG src={ConfigIcon}/>),
    path: '/configs',
    routeActive: ['/configs'],
  },
]
