const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Servicio para crear un archivo con permisos
const createFile2 = async ({ filename, mimetype, data, uploaderId, permissions }) => {
    try {
        // Crea un nuevo archivo en la base de datos
        const file = await prisma.file.create({
            data: {
                filename,
                mimetype,
                data, // Datos binarios
                uploaderId: Number(uploaderId),
                permissions: {
                    create: permissions, // Asignamos permisos a usuarios
                },
            },
        });
        return file;
    } catch (error) {
        console.error("Error creating File:", error);
        throw error;
    }
};

const createFile = async ({ filename, mimetype, data, uploaderId, permissions }) => {
    try {
        // Convierte uploaderId a un número entero si aún no lo es
        uploaderId = parseInt(uploaderId, 10);

        const file = await prisma.file.create({
            data: {
                filename,
                mimetype,
                data: Buffer.from(data),  // Asegura que data es un Buffer
                uploaderId: uploaderId,    // Pasa uploaderId como entero válido
                permissions: {
                    create: permissions.map(permission => ({
                        userId: permission.userId,
                        canView: permission.canView || false,
                        canEdit: permission.canEdit || false,
                        canDelete: permission.canDelete || false
                    }))
                }
            }
        });
        return file;
    } catch (error) {
        console.error("Error al crear el archivo:", error);
        throw error;
    }
};



// Obtener archivo por ID
const getFileById = async (id) => {
    return await prisma.file.findUnique({
        where: { id: parseInt(id) },
        select: {
            filename: true,
            mimetype: true,
            data: true // Contenido binario
        }
    });
};

// Servicio para obtener un archivo por su ID
const getFileById2 = async (id) => {
    try {
        return await prisma.file.findUnique({ where: { id } });
    } catch (error) {
        console.error("Error obteniendo el archivo:", error);
        throw error;
    }
};

// Servicio para obtener todos los archivos con sus permisos
const getFiles = async () => {
    try {
        return await prisma.file.findMany({
            select: {
                id: true,
                filename: true,
                mimetype: true
            }

            // include: {
            //     permissions: true // Incluir los permisos de cada archivo
            // }
        });
    } catch (error) {
        console.error("Error al obtener archivos:", error);
        throw error;
    }
};

const deleteById = async (id) => {
    const fileId = id;
    console.log("deletebyid" + id);

    await 
        prisma.permission.delete({
        where : {id: Number(fileId)}
    }); 
    
    await 
    prisma.file.delete({
        where: { id: Number(id) }
    });

}



const updateById = async (id, filename, permissions) => {

    await prisma.file.update({
        where: { id: Number(id) },
        data: {
            filename,
            permissions: {
                updateMany: permissions.map((permission) => ({
                    where: { userId: permission.userId },
                    data: {
                        canView: permission.canView || false,
                        canEdit: permission.canEdit || false,
                        canDelete: permission.canDelete || false
                    }
                }))
            }
        },
    });
}



module.exports = {
    createFile,
    getFiles,
    getFileById,
    deleteById,
    updateById
};
