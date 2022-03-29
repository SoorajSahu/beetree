const { PrismaClient } = require("@prisma/client");
const { PostsDataValidation } = require('../../../helper/validationSchema');
const PostService = require('../../service/posts.service')

const prisma = new PrismaClient;

module.exports = {
    showPosts: (req, res) => {
        try {
            prisma.posts.findMany().then((data) => {
                res.status(200).send(data);
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    showPostsBySearch: async(req, res) => {
        try {
            let data = {};
            if (req.query.query.length > 0) {
                const q = req.query.query;
                const qu = { contains: q }
                data = await prisma.posts.findMany({
                    where: {
                        OR: [{
                            author: qu,
                        }, {

                            description: qu,
                        }, {

                            title: qu,
                        }],
                    },
                    take: 10,
                })
            } else {
                data = await prisma.posts
                    .findMany({
                        take: 10,
                    })
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    addPost: async(req, res) => {
        try {
            const { body } = req;
            body.tags = (req.body.tags).split(', ');
            const data = await PostsDataValidation.validateAsync(body);
            const rows = await PostService.getAllByCondition({
                OR: [{
                        name: data.name,
                    },
                    {
                        link: data.link,
                    },
                ],
            });
            if (!rows.length) {
                await prisma.posts.create({ data }).then(() => {
                    res.status(201).send({ message: 'Post Added Successfully' });
                });
            } else {
                res.status(500).send({ message: 'Post title Or link already exist!.' });
            }
            res.send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    updatePost: async(req, res) => {
        try {
            const data = await PostsDataValidation.validateAsync(req.body);
            const rows = await prisma.posts.findMany({
                where: {
                    OR: [{
                            name: data.name,
                        },
                        {
                            link: data.link,
                        },
                    ],
                },
            });

            if (!rows.length) {
                await prisma.posts.create({ data }).then(() => {
                    res.status(201).send({ message: 'Post Added Successfully' });
                });
            } else {
                res.status(200).send({ message: 'Post title Or link already exist!.' });
            }
            res.send(data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    },
};