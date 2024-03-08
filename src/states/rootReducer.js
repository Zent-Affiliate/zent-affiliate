import appReducer from './modules/app/index.js';
import authReducer from './modules/auth/index.js';
import proFileReducer from './modules/profile/index.js';
import userReducer from './modules/user/index.js';
import projectReducer from './modules/project/index.js';
import configReducer from './modules/config/index.js';
import commissionReducer from './modules/commission/index.js';

const rootReducer = {
    app: appReducer,
    auth: authReducer,
    profile: proFileReducer,
    user: userReducer,
    project: projectReducer,
    config: configReducer,
    commission: commissionReducer
};

export default rootReducer;
