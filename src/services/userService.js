const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (name, email, password, roleName) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña con un factor de costo de 10.
    console.log("createUser --> service")
    return await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            roleId: roleName.name == "Admin" ? 1 : 1,
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

