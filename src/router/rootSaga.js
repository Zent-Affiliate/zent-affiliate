import loadAuthSaga from '@/states/modules/auth/saga.js';
import homeSaga from '@/states/modules/home/saga.js';
import userSaga from '@/states/modules/user/saga';

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_USER_PAGE'] = userSaga;
