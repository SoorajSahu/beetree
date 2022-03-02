const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

class PostService {
    static async getAllByCondition(cond) {
        const data = await prisma.posts.findMany({
            where: cond,
        });
        return data;
    }
    static async getOneByCondition(cond) {
        const data = await prisma.posts.findUnique({
            where: {
                cond,
            },
        });
        return data;
    }
}
module.exports = PostService;