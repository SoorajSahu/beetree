// const { allow } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const expression =
    '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';
const regexp = new RegExp(expression);

const signupSchema = Joi.object({
    name: Joi.string().trim().replace(/\s\s+/g, ' ').required(),
    email: Joi.string()
        .trim()
        .replace(/\s\s+/g, ' ')
        .email()
        .required()
        .lowercase(),
    password: Joi.string().min(4).required(),
});
const userSignupSchema = Joi.object({
    name: Joi.string().trim().replace(/\s\s+/g, ' ').required(),
    email: Joi.string()
        .trim()
        .replace(/\s\s+/g, ' ')
        .email()
        .required()
        .lowercase(),

});

const AuthSchema = Joi.object({
    email: Joi.string()
        .trim()
        .replace(/\s\s+/g, ' ')
        .email()
        .required()
        .lowercase(),
    password: Joi.string().min(4).required(),
});

const CategorySchema = Joi.object({
    name: Joi.string()
        .min(2)
        .required()
        .uppercase()
        .trim()
        .replace(/\s\s+/g, ' '),
    image_url: Joi.string()
        .pattern(regexp)
        .messages({
            'string.pattern.base': 'Please Enter Valid Image URL',
        }),
});

const LinkValidationSchema = Joi.object({
    category_id: Joi.number().required(),
    title: Joi.string().trim().replace(/\s\s+/g, ' ').required(),
    link: Joi.string().pattern(regexp).required().label('Video URL').messages({
        'string.pattern.base': 'Please Enter Valid Video URL',
    }),
    tags: Joi.string().allow(null, ''),
    link_type: Joi.string().trim().replace(/\s\s+/g, '').required(),
    // ativate_link:Joi
    image_link: Joi.string()
        .pattern(regexp)
        .messages({
            'string.pattern.base': 'Please Enter Valid Image URL',
        })
        .allow(null, ''),
    author: Joi.string().allow(null, ''),
    active_link: Joi.number().allow(1, 0),
    description: Joi.string().trim().replace(/\s\s+/g, ' ').allow(null, ''),
});

const formDataValidation = Joi.object({
    fname: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp(/^([a-zA-Z '`"]+)$/))
        .max(50)
        .required()
        .uppercase()
        .messages({
            'string.pattern.base': "Please Enter The Valid 'First Name'",
            'any.required': "'First Name' Can not be empty.",
        }),

    lname: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp(/^([a-zA-Z '`"]+)$/))
        .trim()
        .replace(/\s\s+/g, ' ')
        .required()
        .uppercase()
        .messages({
            'string.pattern.base': "Please Enter The Valid 'Last Name'",
            'any.required': "'Last Name' Can not be empty.",
        }),
    mname: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp(/^([a-zA-Z '`"]+)$/))
        .replace(/\s\s+/g, ' ')
        .allow(null, '')
        .messages({
            'string.pattern.base': "Please Enter The Valid 'Middle Name'",
        }),
    address: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Address' Can not be empty.",
    }),

    unit: Joi.string().trim().replace(/\s\s+/g, ' ').allow(null, ''),
    city: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'City' Can not be empty.",
    }),
    state: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'State' Can not be empty.",
    }),
    zip: Joi.string()
        .trim()
        .replace(/\s\s+/g, ' ')
        .min(5)
        .max(10)
        .required()
        .messages({
            'any.required': "'Zip' Can not be empty.",
            'string.min': "'Zip' Can not be less then 5 digit",
            'string.max': "'Zip' Can not be greater then 10 digit",
        }),
    phone: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp(/^([+0-9]+)$/))
        .required()
        .min(10)
        .max(13)
        .messages({
            'string.pattern.base': "Please Enter The Valid 'Phone Number'",
            'any.required': "'Phone Number' Can not be empty.",
            'string.min': "'Phone Number' Can not be less then 10 digit",
            'string.max': "'Phone Number' Can not be greater then 13 digit",
        }),
    email: Joi.string()
        .trim()
        .replace(/\s\s+/g, ' ')
        .email()
        .required()
        .lowercase()
        .messages({
            'any.required': "'Email' Can not be empty.",
            'string.email': "Not a valid 'Email' Field ",
        }),
    deduction: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Deduction' Can not be empty.",
    }),
    dob: Joi.date().min('now').required().messages({
        'date.required': "'Date' value should be more then today.",
    }),
    residency_status: Joi.string(),
    industry: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Industry' Can not be empty.",
    }),
    occupation: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Occupation' Can not be empty.",
    }),
    education: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Education' Can not be empty.",
    }),
    plan: Joi.string().trim().replace(/\s\s+/g, ' ').required().messages({
        'any.required': "'Plan' Can not be empty.",
    }),
});

module.exports = {
    signupSchema,
    AuthSchema,
    CategorySchema,
    LinkValidationSchema,
    formDataValidation,
    userSignupSchema,
};