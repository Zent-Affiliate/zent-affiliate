import loadAuthSaga from '@/states/modules/auth/saga.js';
import homeSaga from '@/states/modules/home/saga.js';
import userSaga from '@/states/modules/user/saga';
import ruleSaga from '@/states/modules/rule/saga.js';

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_USER_PAGE'] = userSaga;
ROUTE_SAGAS['LOAD_RULE_SAGA'] = ruleSaga;
