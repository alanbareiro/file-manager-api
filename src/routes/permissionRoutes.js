const express = require('express');
const permissionController = require('../controllers/permissionController');

const router = express.Router();

// Ruta para crear un permiso nuevo
router.post('/', permissionController.createPermission);

// Ruta para obtener los permisos de un archivo
router.get('/:fileId', permissionController.getPermissionsByFileId);

// Ruta para actualizar un permiso existente
// router.put('/:id', permissionController.updatePermission);

// Ruta para actualizar permisos
router.put('/update', permissionController.updatePermission);

module.exports = router;
