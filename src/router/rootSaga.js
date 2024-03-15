import loadAuthSaga from '@/states/modules/auth/saga.js';
import homeSaga from '@/states/modules/home/saga.js';
import userSaga from '@/states/modules/user/saga';
import adminSaga from '@/states/modules/admin/saga';
import projectSaga from '@/states/modules/project/saga'
import projectAdmin from '@/states/modules/projectAdmin/saga';
import projectDetailSaga from '@/states/modules/projectDetail/saga';

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_USER_PAGE'] = userSaga;
ROUTE_SAGAS['LOAD_ADMIN_PAGE'] = adminSaga;
ROUTE_SAGAS['LOAD_PROJECT_PAGE'] = projectSaga;
ROUTE_SAGAS['LOAD_PROJECT_ADMIN_PAGE'] = projectAdmin;
ROUTE_SAGAS['LOAD_PROJECT_DETAIL_PAGE'] = projectDetailSaga;
