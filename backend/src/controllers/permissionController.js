const permissionService = require('../services/permissionService');

// Controlador para crear un nuevo permiso
const createPermission = async (req, res) => {
    try {
        const { userId, fileId, canView, canEdit, canDelete } = req.body;

        // Llamada al servicio para crear un permiso
        const newPermission = await permissionService.createPermission(userId, fileId, canView, canEdit, canDelete);
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ error: "Error creando permiso" });
    }
};

// Controlador para obtener los permisos de un archivo
const getPermissionsByFileId = async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const permissions = await permissionService.getPermissionsByFileId(fileId);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo permisos" });
    }
};

// Controlador para actualizar un permiso existente.
// const updatePermission = async (req, res) => {
//     try {
//         const id = req.params.id; // ID del permiso a actualizar.
//         const { canView, canEdit, canDelete } = req.body;
//         const updatedPermission = await permissionService.updatePermission(id, canView, canEdit, canDelete);
//         res.status(200).json(updatedPermission);
//     } catch (error) {
//         res.status(500).json({ error: "Error actualizando permiso" });
//     }
// };

// Actualizar permisos de un archivo para un usuario
const updatePermission = async (req, res) => {
    try {
        const { fileId, userId, canView, canEdit, canDelete } = req.body;

        const updatedPermission = await permissionService.updatePermission({
            fileId,
            userId,
            canView,
            canEdit,
            canDelete
        });

        res.status(200).json({ message: 'Permisos actualizados', updatedPermission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar los permisos' });
    }
};

module.exports = {
    createPermission,
    getPermissionsByFileId,
    updatePermission
};
