import {
  MAX_DOMAIN_STRING_SIZE,
  MAX_NAME_PROJECT_STRING_SIZE,
  VALIDATE_DOMAIN_REGEX,
  VALIDATE_NAME_PROJECT_REGEX,
} from "@/utils/constains";

import Joi from "joi";

export const createProjectSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(MAX_NAME_PROJECT_STRING_SIZE)
    .required()
    .regex(VALIDATE_NAME_PROJECT_REGEX)
    .label("Tên dự án"),
  domain: Joi.string()
    .trim()
    .max(MAX_DOMAIN_STRING_SIZE)
    .required()
    .regex(VALIDATE_DOMAIN_REGEX)
    .label("Link dự án"),
  server: Joi.string()
    .trim()
    .required()
    .label("Máy chủ"),
  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .label("Nhãn dự án")
    )
    .label("Nhãn dự án"),
});

export const updateProjectSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.string()
    .trim()
    .max(MAX_NAME_PROJECT_STRING_SIZE)
    .required()
    .regex(VALIDATE_NAME_PROJECT_REGEX)
    .label("Tên dự án"),
  domain: Joi.string()
    .trim()
    .max(MAX_DOMAIN_STRING_SIZE)
    .required()
    .regex(VALIDATE_DOMAIN_REGEX)
    .label("Link dự án"),
  server: Joi.string()
    .trim()
    .required()
    .label("Máy chủ"),
  tags: Joi.array()
    .items(
      Joi.string()
        .trim()
        .label("Nhãn dự án")
    )
    .label("Nhãn dự án"),
});
