import {MAX_SIZE_NAME} from '@/utils/constants.js';
import {VALIDATE_NAME_REGEX_RULE} from '@/utils/helper';
import Joi from 'joi';

export const createRuleSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Name')
});
export const updateRuleSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .pattern(VALIDATE_NAME_REGEX_RULE)
        .required()
        .label('Name')

});
