import {cloneDeep, noop} from 'lodash';

export const JOI_DEFAULT_MESSAGE = {
    // boolean
    'boolean.base': '{{#label}} wrong format.',

    // string
    'string.base': '{{#label}} wrong format.',
    'string.empty': '{{#label}} is not vacant.',
    'string.min': '{{#label}} cannot be less {{#limit}} characters.',
    'string.max': '{{#label}} must not be exceeded {{#limit}} characters.',
    'string.pattern.base': '{{#label}} malformed.',
    'string.email': '{{#label}} malformed.',

    // number
    'number.base': '{{#label}} wrong format.',
    'number.integer': '{{#label}} wrong format.',
    'number.min': '{{#label}} cannot be less {{#limit}}.',
    'number.max': '{{#label}} must not be exceeded {{#limit}}.',

    // array
    'array.base': '{{#label}} wrong format.',
    'array.unique': 'Các {{#label}} must not be the same.',
    'array.min': '{{#label}} cannot be less {{#limit}} characters.',
    'array.max': '{{#label}} must not be exceeded {{#limit}} characters.',
    'array.length': '{{#label}} phải có đúng {{#limit}} characters.',
    'array.includesRequiredUnknowns': '{{#label}} illegal.',
    'array.includesRequiredKnowns': '{{#label}} illegal.',

    // object
    'object.base': '{{#label}} wrong format.',
    'object.unknown': 'Trường {#key} is not determined.',
    'object.instance': '{{#label}} wrong format.',

    // binary
    'binary.base': '{{#label}} illegal.',
    'binary.min': '{{#label}} cannot be less {{#limit}} bytes.',
    'binary.max': '{{#label}} must not be exceeded {{#limit}} bytes.',

    // any
    'any.only': '{{#label}} must be {if(#valids.length == 1, \'\', \'one of \')}{{#valids}}.',
    'any.required': '{{#label}} is not vacant.',
    'any.unknown': 'Trường {#key} is not determined.',
    'any.invalid': '{{#label}} illegal.',
    'any.exists': '{{#label}} already exist.'
};

export const JOI_DEFAULT_OPTIONS = {
    abortEarly: false,
    errors: {
        wrap: {label: false},
        language: {'any.exists': 'any.exists'}
    },
    stripUnknown: true
};

export function validate(schema, data, event = {onSuccess: noop, onError: noop}) {
    const {value, error} = schema.messages(JOI_DEFAULT_MESSAGE).validate(data, {
        ...JOI_DEFAULT_OPTIONS,
        context: {
            data: cloneDeep(data)
        }
    });
    if (error) {
        const details = error.details.reduce(function(pre, curr) {
            const path = curr.path.join('.');
            if (!(path in pre)) {
                pre[path] = curr.message;
            }
            return pre;
        }, {});
        event.onError(details);
    } else {
        event.onSuccess(value);
    }
}
