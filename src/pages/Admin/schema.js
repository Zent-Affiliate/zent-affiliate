import {ACTIVE_STATUS, MAX_SIZE_NAME, MAX_STRING_SIZE} from '@/utils/constants';
import {VALIDATE_NAME_REGEX_RULE, VALIDATE_PASSWORD_REGEX} from '@/utils/helper';
import Joi from 'joi';

export const updateAdminSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Name'),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email({tlds: false})
        .required()
        .label('Email'),
    _id: Joi.any(),
    status: Joi.number()
        .valid(...Object.values(ACTIVE_STATUS))
        .label('Status')
        .messages({'any.only': 'Invalid status.'})
});

export const createAdminSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Name'),
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
                'Password must include lowercase letters, uppercase letters, numbers and special characters.'
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
        .label('New password')
        .messages({
            'string.pattern.base':
                'Password must include lowercase letters, uppercase letters, numbers and special characters.'
        }),
    confirm_password: Joi.string()
        .required()
        .valid(Joi.ref('new_password'))
        .label('Confirm password')
        .messages({
            'any.only': 'Confirmation password does not match.'
        })
});

export const changeStatus = Joi.object({
    status: Joi.number()
        .valid(...Object.values(ACTIVE_STATUS))
        .label('Status')
        .messages({'any.only': 'Invalid status.'})
});
