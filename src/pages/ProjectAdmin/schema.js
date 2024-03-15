import {MAX_SIZE_NAME, MAX_STRING_SIZE} from '@/utils/constains';
import Joi from 'joi';

export const updateProjectAdminSchema = Joi.object({
    code: Joi.string()
        .trim()
        .min(8)
        .max(MAX_SIZE_NAME)
        .required()
        .label('Code'),
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name of Project'),
    secret_key: Joi.string()
        .trim()
        .min(16)
        .max(MAX_STRING_SIZE)
        .required()
        .label('Secret key')
});

export const createProjectAdminSchema = Joi.object({
    code: Joi.string()
        .trim()
        .min(8)
        .max(MAX_SIZE_NAME)
        .required()
        .label('Code'),
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name of Project'),
    secret_key: Joi.string()
        .trim()
        .min(16)
        .max(MAX_STRING_SIZE)
        .required()
        .label('Secret key')
});
