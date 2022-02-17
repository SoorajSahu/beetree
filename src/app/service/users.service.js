const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

class UserService {
    static async getAllByCondition(cond) {
        const allUsers = await prisma.users.findMany({
            where: {
                cond,
            },
        });
        return allUsers;
    }
    static async getOneByCondition(cond) {
        const allUsers = await prisma.users.findUnique({
            where: {
                cond,
            },
        });
        return allUsers;
    }
}
module.exports = UserService;