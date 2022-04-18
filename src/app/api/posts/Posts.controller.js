const { PrismaClient, Prisma } = require('@prisma/client');
const _ = require('lodash');
const { PostsDataValidation } = require('../../../helper/validationSchema');
const PostService = require('../../service/posts.service');

const prisma = new PrismaClient({
    log: ['query']
});

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
            if ((req.query.query)) {
                const q = req.query.query;
                const { type } = req.query;
                const qu = `%${q}%`;
                if (q.length) {
                    data =
                        type !== 'all' ?
                        await prisma.$queryRaw `SELECT * FROM posts WHERE (author LIKE ${qu} OR description LIKE ${qu} OR title LIKE ${qu}) AND link_type = ${type} limit 10` :
                        await prisma.$queryRaw `SELECT * FROM posts WHERE (author LIKE ${qu} OR description LIKE ${qu} OR title LIKE ${qu}) limit 10`;
                } else {
                    data = await prisma.posts.findMany({
                        take: 10,
                    });
                }
            }
            // console.log(qu, type);

            res.status(200).json({ message: 'Success', data });
        } catch (error) {
            res.status(500).send({ message: 'Fail', status: error.message });
        }
    },
    addPost: async(req, res) => {
        try {
            const { body } = req;
            body.tags = req.body.tags.split(', ');
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
    searchByAll: async(req, res) => {
        try {
            if (req.query.query.length > 0) {
                const q = req.query.query;
                const stype = req.query.stype ?
                    req.query.stype == 'all' ?
                    '' :
                    req.query.stype :
                    '';
                await prisma.posts
                    .findMany({
                        // where: {
                        //     link_type: ""
                        // },
                    })
                    .then((data) => {
                        res.status(200).send(data);
                    });
            } else {
                res.status(200).send([]);
            }
        } catch (error) {
            console.log(error.message);
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
    deletePosts: async(req, res) => {
        try {
            const postId = req.params.id;
            // const post = prisma
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
    }
};