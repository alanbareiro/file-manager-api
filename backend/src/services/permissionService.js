const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Servicio para agregar un permiso específico para un usuario y archivo
const createPermission = async (userId, fileId, canView, canEdit, canDelete) => {
    try {
        return await prisma.permission.create({
            data: {
                userId:Number(userId), // ID del usuario que recibirá el permiso
                fileId, // ID del archivo al que se asigna el permiso
                canView, // Permiso para ver el archivo
                canEdit, // Permiso para editar el archivo
                canDelete // Permiso para borrar el archivo
            }
        });
    } catch (error) {
        console.error("Error creando permiso:", error);
        throw error;
    }
};

// Servicio para obtener permisos de un archivo específico
const getPermissionsByFileId = async (fileId) => {
    try {
        return await prisma.permission.findMany({
            where: { fileId } // Filtra por el ID del archivo
        });
    } catch (error) {
        console.error("Error obteniendo permisos:", error);
        throw error;
    }
};

// Servicio para actualizar los permisos de un archivo para un usuario específico.
// const updatePermission = async (permissionId, canView, canEdit, canDelete) => {
//     try {
//         const updatedPermission = await prisma.permission.update({
//             where: { id: permissionId },
//             data: { canView, canEdit, canDelete }
//         });
//         return updatedPermission;
//     } catch (error) {
//         console.error("Error actualizando permiso:", error);
//         throw error;
//     }
// };

// Actualizar permisos de un archivo para un usuario
const updatePermission = async ({ fileId, userId, canView, canEdit, canDelete }) => {
    const permission = await prisma.permission.updateMany({
        where: {
            fileId: parseInt(fileId),
            userId: parseInt(userId)
        },
        data: {
            canView,
            canEdit,
            canDelete
        }
    });
    return permission;
};

module.exports = {
    createPermission,
    getPermissionsByFileId,
    updatePermission
};
