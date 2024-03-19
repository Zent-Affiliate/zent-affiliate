import React from 'react';
import store from '@/states/configureStore';
import { notification } from 'antd';
import moment from 'moment';
import CloseIcon from '@/assets/images/icons/light/close.svg';
import success from '@/assets/images/icons/notification/success_16x16.svg';
import error from '@/assets/images/icons/notification/error_16x16.svg';
import warning from '@/assets/images/icons/notification/warning_16x16.svg';
import Swal from 'sweetalert2';
import _ from 'lodash';

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/;
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,50}$/;
export const VALIDATE_PHONE_REGEX_RULE = /^(0[235789])[0-9]{8}$/;
export const VALIDATE_NAME_REGEX_RULE = /^[\p{L} ]*$/u;

export const hasPermission = (permissions) => {
    let { auth } = store.getState();
    let isPermission = false;
    if (permissions) {
        permissions.forEach(permission => {
            if (auth.me && auth.me.permissions && auth.me.permissions.includes(permission)) {
                isPermission = true;
            }
        });
    }

    return isPermission;
};

export const getNotification = (type, content, duration = 3, align = 'top') => {
    let typeNotification = handleGetTypeNotification(type);
    notification[type]({
        message: '',
        description: (<div className={`notification-content ${typeNotification.className}`}>
            <div className={'icon-notification'}>
                <img src={typeNotification.icon} alt='' />
            </div>
            <span className={'text-notification'}>{content}</span>
        </div>),
        closeIcon: (<img src={CloseIcon} alt='' />),
        placement: align,
        duration: duration,
        style: { fontWeight: 'normal' }
    });
};

const handleGetTypeNotification = (type) => {
    let typeNotification = {};
    switch (type) {
        case 'error':
            typeNotification = {
                className: 'notification-error', icon: error
            };
            break;
        case 'warning':
            typeNotification = {
                className: 'notification-warning', icon: warning
            };
            break;
        default:
            typeNotification = {
                className: 'notification-success', icon: success
            };
    }
    return typeNotification;
};

export const getDynamicRoute = (path) => {
    const { location } = store.getState().app;
    const params = location?.params || {};

    let pathActive = path;
    if (_.isString(pathActive) && pathActive && !!pathActive.length) {
        if (pathActive.startsWith('/')) {
            pathActive = pathActive.substring(1);
        }
        const pathArray = pathActive.split('/');

        const newArray = pathArray.map((item) => {
            if (item.startsWith(':')) {
                const pathWithoutColon = item.replace(/:/g, '');
                return params[pathWithoutColon];
            }
            return item;
        });
        let pathString = newArray.join('/');
        if (!pathString.startsWith('/')) {
            pathString = '/' + pathString;
        }

        return pathString;
    }
};

export const isRouteActive = (path) => {
    const { location } = store.getState().app;
    const currentPath = location.pathName;

    return getDynamicRoute(path) === currentPath;
};

export const handleCheckRoute = (routes) => {
    let isActive = false;

    const handleCheckArr = (index) => {
        if (index >= routes.length) return;

        if (isRouteActive(routes[index])) {
            isActive = true;
            return;
        } else {
            return handleCheckArr(++index);
        }
    };

    handleCheckArr(0);

    return isActive;
};


export const convertQueryStringToObject = (queryString) => {
    if (queryString.charAt(0) === '?') {
        queryString = queryString.substring(1);
    }

    let pairs = queryString.split('&');
    let result = {};

    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        let key = decodeURIComponent(pair[0]);
        let value = decodeURIComponent(pair[1] || '');

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }

            result[key].push(value);
        } else {
            result[key] = value;
        }
    }

    return result;
};

export const formatDate = (date) => {
    return moment(date * 1000).format('HH:mm DD/MM/YYYY');
};

export function classNames(...classes) {
    return classes.filter((value) => !!value).map((value) => `${value}`).join(' ');
}

export function handleNotification(type, message) {
    Swal.fire({
        position: 'center',
        icon: type,
        title: `<span class='text-lg'>${message}</span>`,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: '!w-[416px] !h-[270px]'
        }
    });

    const notification = document.querySelector('.swal2-container');
    notification.style.zIndex = 99999;
}

export const copyToClipboard = (value) => {
    navigator.clipboard
        .writeText(value)
        .then(() => getNotification('success', 'Copied!', 1))
};
