// const { allow } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const expression =
    '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';
const regexp = new RegExp(expression);
const stringValidation = Joi.string()
    .min(2)
    .required()
    .trim()
    .replace(/\s\s+/g, ' ');
const emailValidation = Joi.string()
    .trim()
    .replace(/\s\s+/g, ' ')
    .email()
    .required()
    .lowercase();
const imageUrl = Joi.string()
    .pattern(regexp)
    .messages({
        'string.pattern.base': 'Please Enter Valid Image URL',
    })
    .allow(null, '');
const signupSchema = Joi.object({
    name: stringValidation,
    email: emailValidation,
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
    email: emailValidation,
    password: Joi.string().min(4).required(),
});

const CategorySchema = Joi.object({
    name: stringValidation,
    image_url: Joi.string()
        .pattern(regexp)
        .messages({
            'string.pattern.base': 'Please Enter Valid Image URL',
        }),
});




const PostsDataValidation = Joi.object({
    category_id: Joi.number().required(),
    image_link: imageUrl,
    link_type: stringValidation,
    active_link: Joi.boolean().allow(true, false),
    title: stringValidation,
    tags: Joi.array().required(),
    link: Joi.string().pattern(regexp).required().label('Video URL').messages({
        'string.pattern.base': 'Please Enter Valid Video URL',
    }),
    description: stringValidation,
    author: stringValidation,
});

module.exports = {
    signupSchema,
    AuthSchema,
    CategorySchema,
    userSignupSchema,
    PostsDataValidation,
};