import {MAX_SIZE_NAME, MAX_STRING_SIZE} from '@/utils/constants.js';
import Joi from 'joi';

export const createOrUpdateRuleSchema = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label('Name'),
    code: Joi.string().trim().min(8).max(MAX_STRING_SIZE).required().label('Code'),
    configs: Joi.array()
        .required()
        .label('configs')
        .min(1)
        .items(
            Joi.object().keys({
                value: Joi.number()
                    .min(0)
                    .integer()
                    .options({convert: false})
                    .strict()
                    .required()
                    .label('Value')
            })
        )
});
