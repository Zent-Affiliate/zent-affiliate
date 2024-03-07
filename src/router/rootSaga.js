import loadAuthSaga from "@/states/modules/auth/saga.js";
import homeSaga from "@/states/modules/home/saga.js";
import serverSaga from "@/states/modules/server/saga";
import userSaga from "@/states/modules/user/saga";
import projectSaga from "@/states/modules/project/saga.js"
import configSaga from "@/states/modules/config/saga.js"

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga;
ROUTE_SAGAS['LOAD_HOME_PAGE'] = homeSaga;
ROUTE_SAGAS['LOAD_USER_PAGE'] = userSaga;
ROUTE_SAGAS['LOAD_PROJECT_PAGE'] = projectSaga;
ROUTE_SAGAS['LOAD_SERVER_PAGE'] = serverSaga;
ROUTE_SAGAS['LOAD_CONFIG_PAGE'] = configSaga;
