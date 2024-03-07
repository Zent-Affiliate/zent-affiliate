import {MAX_SIZE_IP, MAX_SIZE_NAME} from '@/utils/constains';
import {VALIDATE_IP_ADDRESS_REGEX} from '@/utils/helper';
import Joi from 'joi';

export const createServerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(MAX_SIZE_NAME)
    .required()
    .label('Tên máy chủ'),
  ip: Joi.string()
    .trim()
    .max(MAX_SIZE_IP)
    .pattern(VALIDATE_IP_ADDRESS_REGEX)
    .required()
    .label('Địa chỉ IP'),
  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .label('Nhãn máy chủ')
    )
    .label('Nhãn máy chủ'),
})

export const updateServerSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string()
    .trim()
    .max(MAX_SIZE_NAME)
    .required()
    .label('Tên máy chủ'),
  ip: Joi.string()
    .trim()
    .max(MAX_SIZE_IP)
    .pattern(VALIDATE_IP_ADDRESS_REGEX)
    .required()
    .label('Địa chỉ IP'),
  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .label('Nhãn máy chủ')
    )
    .label('Nhãn máy chủ'),
})
