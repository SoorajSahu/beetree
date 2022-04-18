const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

const {
    signupSchema,
    AuthSchema,
} = require('../../../helper/validationSchema');


const saltRounds = 10;

const signinPage = (req, res) => {
    res.render('signin');
}
const signupPage = (req, res) => {
    res.render('signup');
}
const register = async(req, res) => {
    try {
        let check;
        const { email } = req.body;
        const results = await signupSchema.validateAsync(req.body);
        const doesExist = await prisma.admins.findMany({
            where: {
                email: results.email,
            },
        });
        if (doesExist.length) { throw createError.Conflict(`${email} is aleady exist`); }
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(results.password, salt, async(_err, hash) => {
                check = await prisma.admins.create({
                    data: {
                        email: results.email,
                        name: results.name,
                        password: hash,
                    },
                    select: {
                        email: true,
                        name: true,
                        password: true,
                    },
                });

            });
        });
        if (check) {
            const message = `${email} user created.`;
            res.render('signin', {
                message,
            });
        }
    } catch (error) {

        res.render('signup', {
            message: error.message,
        });
    }
}
const authentication = async(req, res) => {
    try {
        const results = await AuthSchema.validateAsync(req.body);
        const admin = await prisma.admins.findMany({
            where: {
                email: results.email,
            },
        });
        // console.log(admin);
        if (admin.length > 0) {
            bcrypt.compare(results.password, admin[0].password, (err, _result) => {
                if (_result) {
                    // eslint-disable-next-line eqeqeq
                    if (admin[0].is_valid == 1) {
                        req.session.auth = {
                            email: admin[0].email,
                            uname: admin[0].name,
                            role: admin[0].role,
                        }
                        req.session.isLogin = true;
                        res.redirect('category');
                    } else {
                        res.render('signin', {
                            message: 'Email id is not verified by super admin.',
                        });
                    }
                } else {
                    res.render('signin', {
                        message: 'Invalid Login credentials',
                    });
                }
            });
        } else { throw Error('Email id not found.'); }

    } catch (error) {
        res.render('signin', {
            message: error.message,
        });
    }
}
const dashboard = (req, res) => {
    res.render('dashboard');
}
const postsDashboardShow = async(req, res) => {
    const posts = await prisma.posts.findMany();
    res.render('posts/addPosts', { user: req.session.auth, posts });
}
const showAllPosts = async(req, res) => {
    const posts = await prisma.posts.findMany();
    res.render('posts/postsDashboard', { user: req.session.auth, posts });
}
module.exports = {
    signinPage,
    postsDashboardShow,
    showAllPosts,
    signupPage,
    register,
    authentication,
    dashboard,
}