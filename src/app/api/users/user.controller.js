const createError = require('http-errors');
const { PrismaClient } = require("@prisma/client");
const { genrateUniqueHash } = require('../../../utility/Common');

const prisma = new PrismaClient;


const {
    userSignupSchema,
} = require('../../../helper/validationSchema');
const UserService = require('../../service/users.service');

module.exports = {

    register: async(req, res) => {
        try {
            const { email } = req.body;
            const results = await userSignupSchema.validateAsync(req.body);
            const doesExist = await prisma.users.findMany({
                where: {
                    email: results.email,
                },
            });

            if (doesExist.length) { throw createError.Conflict(`${email} is aleady exist`); }
            const hash = genrateUniqueHash(results.name);
            const uniqueCode = !UserService.getOneByCondition({
                code: hash,
            }) ? hash : genrateUniqueHash(results.name);
            console.log('uniqueCode', uniqueCode);
            const isStored = await prisma.users.create({
                data: {
                    email: results.email,
                    name: results.name,
                    code: uniqueCode,
                },
            });
            if (isStored) {
                const message = `${email} user created.`;
                res.status(201).send({
                    message,
                });
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                message: error.message,
            });
        }
    },
    update: async(req, res) => {
        try {
            const { email } = req.body;
            const results = await userSignupSchema.validateAsync(req.body);
            const doesExist = await prisma.users.findMany({
                where: {
                    email: results.email,
                },
            });
            if (doesExist.length) { throw createError.Conflict(`${email} is aleady exist`); }
            const isStored = await prisma.users.create({
                data: {
                    email: results.email,
                    name: results.name,
                },
            });
            if (isStored) {
                const message = `${email} user created.`;
                res.status(201).send({
                    message,
                });
            }

        } catch (error) {
            res.status(500).send({
                message: error.message,
            });
        }
    },
    authentication: async(req, res) => {
        try {
            const admin = await prisma.users.findMany();
            res.status(200).json({
                message: 'success',
                body: admin,
            });
        } catch (error) {
            res.render('signin', {
                message: error.message,
            });
        }
    },
    dashboard: (req, res) => {
        res.render('dashboard');
    },
}