const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

// Ruta para subir archivos
router.post('/upload', fileController.uploadFile);

// Ruta para obtener archivo por ID
router.get('/:id', fileController.getFileById);

// Ruta para obtener todos los archivos y sus permisos
router.get('/', fileController.getFiles);

module.exports = router;
