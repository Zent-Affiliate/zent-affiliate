import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import proFileReducer from './modules/profile/index.js';
import userReducer from './modules/user/index.js';
import projectReducer from './modules/project/index.js';
import serverReducer from './modules/server/index.js';
import tagReducer from './modules/tag/index.js';
import configReducer from './modules/config/index.js';
import adminReducer from './modules/admin/index.js';
import projectAdmin from './modules/projectAdmin/index.js';
import projectDetail from './modules/projectDetail/index.js';

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    admin: adminReducer,
    profile: proFileReducer,
    user: userReducer,
    project: projectReducer,
    tag: tagReducer,
    projectAdmin: projectAdmin,
    projectDetail: projectDetail,
    server: serverReducer,
    config: configReducer
};

export default rootReducer;
