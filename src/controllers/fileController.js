const fileService = require('../services/fileService');

// Controlador para crear un nuevo archivo y asignar permisos
const uploadFile  = async (req, res) => {
    try {
        // Recibimos los datos del archivo y permisos desde el cuerpo de la solicitud
        const { filename, mimetype, uploaderId, permissions } = req.body;
        const fileData = req.file.buffer; // Obtenemos los datos binarios del archivo desde la solicitud
        
        // Si no se especifican permisos, se asignan permisos por defecto al creador del archivo
        const defaultPermissions = permissions || [{
            userId: uploaderId,
            canView: true,
            canEdit: true,
            canDelete: true
        }];

        // Llamada al servicio para crear el archivo
        const file = await fileService.createFile({
            filename,
            mimetype,
            data: fileData, // Guardamos los datos binarios
            uploaderId,
            defaultPermissions
        });

        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ error: "Error Uploading the File" });
    }
};

// Obtener archivo por ID
const getFileById = async (req, res) => {
    try {
        const id = req.params.id;
        const file = await fileService.getFileById(id);

        if (!file) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        // Devolver contenido en función del tipo de archivo
        res.setHeader('Content-Type', file.mimetype);
        res.send(file.data); // Devolvemos los datos binarios
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al recuperar el archivo' });
    }
};

// Controlador para obtener todos los archivos junto con sus permisos
const getFiles = async (req, res) => {
    try {
        const files = await fileService.getFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo archivos" });
    }
};

module.exports = {
    uploadFile,
    getFiles,
    getFileById
};
