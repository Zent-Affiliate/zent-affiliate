import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import proFileReducer from './modules/profile/index.js';
import userReducer from './modules/user/index.js';
import projectReducer from './modules/project/index.js';
import ruleReducer from './modules/rule/index.js';
import commissionReducer from './modules/commission/index.js';
import adminReducer from './modules/admin/index.js';
import projectAdmin from './modules/projectAdmin/index.js';
import projectDetail from './modules/projectDetail/index.js';
import secretKey from './modules/secretKey/index.js';

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    admin: adminReducer,
    profile: proFileReducer,
    user: userReducer,
    project: projectReducer,
    rule: ruleReducer,
    commission: commissionReducer,
    projectAdmin: projectAdmin,
    projectDetail: projectDetail,
    secretkey: secretKey
};

export default rootReducer;
