import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {VALIDATE_PASSWORD_REGEX} from '@/utils/helper.js';
import {setDataChangePassword, setErrorChangePassword} from '@/states/modules/profile/index.js';
import {changePassword} from '@/api/profile/index.js';
import {validate} from '@/utils/validates/index.js';
import Joi from 'joi';

const changePasswordValidateSchema = Joi.object({
    password: Joi.string()
        .required()
        .label('Current password'),
    newPassword: Joi.string()
        .required()
        .min(8)
        .max(255)
        .regex(VALIDATE_PASSWORD_REGEX)
        .label('A new password')
        .custom((value, helpers) => {
            return helpers.prefs.context.data.password !== value ?
                value :
                helpers.message('The new password must not match the current password.');
        })
        .messages({'string.pattern.base': '{{#label}} must include lowercase letters, uppercase letters, numbers and special characters.'}),
    confirmPassword: Joi.string()
        .required()
        .label('Password')
        .custom((value, helpers) => {
            return helpers.prefs.context.data.newPassword === value ?
                value :
                helpers.message('Confirmation password does not match.');
        })
});

export default function Handle(props) {
    const {handleResetError} = props;
    const dataChangePassword = useSelector(state => state.profile.dataChangePassword);
    const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
    const isLoadingBtnChangePassword = useSelector(state => state.profile.isLoadingBtnChangePassword);
    const dispatch = useDispatch();

    const handleChangeInput = (e, type) => {
        let value = e.target.value;
        let data = _.cloneDeep(dataChangePassword);
        data[type] = value;
        dispatch(setDataChangePassword(data));
    };

    const handleFocus = (type) => handleResetError(type);

    const handleConfirmChangePassword = () => {
        validate(changePasswordValidateSchema, dataChangePassword, {
            onSuccess: (data) => {
                dispatch(changePassword(data));
            },
            onError: (err) => {
                dispatch(setErrorChangePassword({...errorChangePassword, ...err}));
            }
        });
    };

    return {
        dataChangePassword,
        errorChangePassword,
        isLoadingBtnChangePassword,
        handleChangeInput,
        handleConfirmChangePassword,
        handleFocus
    };
}
