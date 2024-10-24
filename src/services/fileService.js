const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Servicio para crear un archivo con permisos
const createFile = async (filename, mimetype, data, uploaderId, permissions) => {
    try {
        // Crea un nuevo archivo en la base de datos
        const file = await prisma.file.create({
            data: {
                filename,
                mimetype,
                data, // Datos binarios
                uploaderId,
                permissions: {
                    create: permissions // Asignamos permisos a usuarios
                }
            }
        });
        return file;
    } 
    catch (error) 
    {
        console.error("Error creating File:", error);
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

// Servicio para obtener todos los archivos con sus permisos
const getFiles = async () => {
    try {
        return await prisma.file.findMany({
            include: {
                permissions: true // Incluir los permisos de cada archivo
            }
        });
    } catch (error) {
        console.error("Error al obtener archivos:", error);
        throw error;
    }
};

module.exports = {
    createFile,
    getFiles,
    getFileById
};
