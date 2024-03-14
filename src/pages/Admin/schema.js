import {ACTIVE_STATUS, MAX_SIZE_NAME, MAX_STRING_SIZE} from '@/utils/constants';
import {VALIDATE_NAME_REGEX_RULE, VALIDATE_PASSWORD_REGEX} from '@/utils/helper';
import Joi from 'joi';

export const updateAdminSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Họ và tên'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email({tlds: false})
        .required()
        .label('Email'),
    _id: Joi.any(),
    status: Joi.number()
        .valid(...Object.values(ACTIVE_STATUS))
        .label('Trạng thái')
        .messages({'any.only': 'Trạng thái không hợp lệ.'})
});

export const createAdminSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Name of Admin'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email({tlds: false})
        .required()
        .label('Email'),
    password: Joi.string()
        .min(8)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .max(MAX_STRING_SIZE)
        .required()
        .label('Password')
        .messages({
            'string.pattern.base':
                'Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.'
        }),
    avatar: Joi.any()
});

export const passwordAdminSchema = Joi.object({
    _id: Joi.any(),
    new_password: Joi.string()
        .min(8)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .required()
        .max(MAX_STRING_SIZE)
        .label('Mật khẩu mới')
        .messages({
            'string.pattern.base':
                'Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt.'
        }),
    confirm_password: Joi.string()
        .required()
        .valid(Joi.ref('new_password'))
        .label('Mật khẩu xác nhận')
        .messages({
            'any.only': 'Mật khẩu xác nhận không trùng khớp.'
        })
});

export const changeStatus = Joi.object({
    status: Joi.number()
        .valid(...Object.values(ACTIVE_STATUS))
        .label('Trạng thái')
        .messages({'any.only': 'Trạng thái không hợp lệ.'})
});
