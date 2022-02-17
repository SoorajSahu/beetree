const { PrismaClient } = require("@prisma/client");
const { CategorySchema } = require('../../../helper/validationSchema');

const prisma = new PrismaClient;

module.exports = {
    showCategories: (req, res) => {
        try {
            prisma.categories.findMany().then((data) => {
                res.status(200).send(data);
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    showCategoriesBySearch: async (req, res) => {
        try {
            if ((req.query.query).length > 0) {
                const q = req.query.query;
                await prisma.categories.findMany({
                    select:{
                        tag:true,
                    },
                    where: {
                        tag:{
                            contains: q ,
                        },
                    },
                }).then((data) => {
                    res.status(200).send(data);
                });
            } else {
                res.status(200).send([]);
            }
     
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    addCategory: async (req, res) => {
        try {
            const data = await CategorySchema.validateAsync(req.body);
            const rows = await prisma.categories.findMany({
                where: { 
                    name: data.name,
                },
            });         
            
            if (rows.length === 0) {
                await prisma.categories.create({
                    data:{
                        image_url: data.image_url,
                        name: data.name,
                        tag: data.name.toLowerCase().replace(/\s+/g, '-'),
      
                    },
                }).then(() => {
                    res.status(201).send({ message: 'category added' });
                });
            } else {res.status(200).send({ message: 'Category already exist!.' });}
            
        } catch (error) {
            res.status(200).send({ message: error.message });
        }
    },
}