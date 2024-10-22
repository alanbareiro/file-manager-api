const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (name, email, password, roleId) => {
    return await prisma.user.create({
        data:{
            name,
            email,
            password,
            roleId
        }
    });
};

const getUsers = async ()=> {
    return await prisma.user.findMany();
};

const getUserById = async (id) => {
    return await prisma.user.findFirst({
        where:{id:Number(id)}
    });
}

const updateUser = async(id,name, email, password, roleId) => {
    return await prisma.user.update({
        where :{ id: Number(id)},
        data: { name, email, password, roleId}
    });
}

const deleteUserById = async(id) =>  {
    return await prisma.user.delete({
        where: {id:Number(id)},
    });
}

module.exports = {
    getUsers, 
    createUser,
    updateUser,
    getUserById,
    deleteUserById
}

