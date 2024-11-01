const express = require('express');
const fileController = require('../controllers/fileController');

module.exports = (upload) => {
    const router = express.Router();

    // Ruta para subir archivos, usando multer para manejar la carga de archivos
    router.post('/upload', upload.single('file'), fileController.uploadFile);

    // Ruta para obtener archivo por ID
    router.get('/:id', fileController.getFileById);

    // Ruta para obtener todos los archivos y sus permisos
    router.get('/', fileController.getFiles);

    router.get('/view/:id', fileController.getFileViewById);

    // DELETE /file/:id
    router.delete('/:id', fileController.deleteById);

    // PUT /file/:id
    router.put('/:id', fileController.updateById);



    return router;
};