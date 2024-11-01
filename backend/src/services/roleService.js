const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRole = async (name) => {
    return await prisma.role.create({
        data: {
            name
        }
    });
};

const getRoles = async ()=> {
    return await prisma.role.findMany();
};

module.exports = {
    createRole,
    getRoles
}