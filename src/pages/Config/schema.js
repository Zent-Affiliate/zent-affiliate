import {CONFIG_TYPE, STATUS_NOTIFICATION, TIME_TYPE, VALIDATE_DOMAIN_REGEX} from '@/utils/constains';
import Joi from 'joi';

export const infoLarkSchema = Joi.object({
  type: Joi.number()
    .required()
    .valid(CONFIG_TYPE.LARK_INFO, CONFIG_TYPE.NOTIFICATION)
    .label('Loại cấu hình')
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  app_id: Joi.string()
    .trim()
    .when('type', {
        is: CONFIG_TYPE.LARK_INFO,
        then: Joi.string()
          .required(),
        otherwise: Joi.any().strip(),
    })
    .label('APP ID'),
  app_secret: Joi.string()
    .trim()
    .when('type', {
      is: CONFIG_TYPE.LARK_INFO,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('APP SECRET'),
  group_id: Joi.string()
    .trim()
    .when('type', {
      is: CONFIG_TYPE.LARK_INFO,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('GROUP ID'),
  oauth_url: Joi.string()
    .trim()
    .when('type', {
      is: CONFIG_TYPE.LARK_INFO,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .regex(VALIDATE_DOMAIN_REGEX)
    .label('OAUTH URL'),
  message_url: Joi.string()
    .trim()
    .when('type', {
      is: CONFIG_TYPE.LARK_INFO,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .regex(VALIDATE_DOMAIN_REGEX)
    .label('MESSAGE URL'),
});

export const notificationSchema = Joi.object({
  type: Joi.number()
    .required()
    .valid(CONFIG_TYPE.LARK_INFO, CONFIG_TYPE.NOTIFICATION)
    .label('Loại cấu hình')
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_time: Joi.number()
    .required()
    .min(1)
    .label('Thời gian chờ sau mỗi lần thông báo')
    .messages({
      'number.min': '{{#label}} phải lớn hơn 0',
      'any.required': '{{#label}} không được bỏ trống',
    }),
  notification_time_type: Joi.number()
    .required()
    .valid(TIME_TYPE.DAY, TIME_TYPE.HOUR, TIME_TYPE.MINUTE)
    .label('Loại thời gian')
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_server: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi máy chủ ngưng hoạt động')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ',
    }),
  notification_project: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi dự án ngưng hoạt động')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_service: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi service, docker container ngưng hoạt động')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_cpu: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi cpu quá tải')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_ram: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi ram quá tải')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  notification_disk: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Trạng thái thông báo khi ổ cứng quá tải')
    .valid(STATUS_NOTIFICATION.NON_NOTIFICATION, STATUS_NOTIFICATION.NOTIFICATION)
    .messages({
      'any.only': '{{#label}} không hợp lệ.',
    }),
  warning_cpu: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION_THRESHOLD,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Ngưỡng cảnh báo cpu quá tải')
    .min(0)
    .max(100)
    .messages({
      'number.min': '{{#label}} không hợp lệ.',
      'number.max': '{{#label}} không hợp lệ.',
    }),
  warning_ram: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION_THRESHOLD,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Ngưỡng cảnh báo ram quá tải')
    .min(0)
    .max(100)
    .messages({
      'number.min': '{{#label}} không hợp lệ.',
      'number.max': '{{#label}} không hợp lệ.',
    }),
  warning_disk: Joi.number()
    .when('type', {
      is: CONFIG_TYPE.NOTIFICATION_THRESHOLD,
      then: Joi.required(),
      otherwise: Joi.any().strip(),
    })
    .label('Ngưỡng cảnh báo ổ cứng quá tải')
    .min(0)
    .max(100)
    .messages({
      'number.min': '{{#label}} không hợp lệ.',
      'number.max': '{{#label}} không hợp lệ.',
    }),
});

