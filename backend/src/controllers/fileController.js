const fileService = require('../services/fileService');

// Controlador para crear un nuevo archivo y asignar permisos
const uploadFile = async (req, res) => {
    try {
        // Recibimos los datos del archivo desde req.file y otros campos desde req.body
        const { filename, mimetype, uploaderId, permissions } = req.body;
        const fileData = req.file.buffer; // Obtenemos los datos binarios del archivo desde req.file

        // Si no se especifican permisos, asignamos permisos por defecto
        const defaultPermissions = permissions ? JSON.parse(permissions).map(permission => ({
            ...permission,
            userId: Number(permission.userId) // Convertir userId a número
        })) : [{
            userId: Number(uploaderId),
            canView: true,
            canEdit: true,
            canDelete: true
        }];


        console.log(defaultPermissions, req.file.mimetype);


        // Llamada al servicio para crear el archivo
        const file = await fileService.createFile({
            filename: req.file.originalname, // nombre original del archivo
            mimetype: req.file.mimetype, // tipo de archivo
            data: fileData, // datos binarios
            uploaderId: Number(uploaderId),
            permissions: defaultPermissions
        });

        res.status(201).json(file);
    } catch (error) {
        console.error("Error al subir el archivo:", error);
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

        
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);//aca te configuro el cabezal para que el navegador lo tome como archivo
        res.setHeader('Content-Type', file.mimetype);

        // Envía los datos binarios para que el archivo se descargue
        res.send(file.data);
    } catch (error) {
        console.error("Error al descargar el archivo:", error);
        res.status(500).json({ error: 'Error al recuperar el archivo' });
    }
};


// Controlador para obtener todos los archivos junto con sus permisos
const getFiles = async (req, res) => {
    try {
        const files = await fileService.getFiles();
        //res.status(200).json(files);
        res.status(200).json(files.map(file => ({
            id: file.id,
            filename: file.filename,
            mimetype: file.mimetype
        })));
    } catch (error) {
        console.error("Error obteniendo archivos:", error);
        res.status(500).json({ error: "Error obteniendo archivos" });
    }
};

const deleteById = async (req, res) => {

    try {
        const {id} = req.params;
        const result = fileService.deleteById(id);

        if (result) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'User was not founded' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error al eliminar el archivo" });
    }
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const { filename, permissions } = req.body;
    try {
        await fileService.updateById(id, filename, permissions);
        res.status(200).send(updatedFile);
    } catch (error) {
        res.status(500).send({ error: "Error al actualizar el archivo" });
    }
}

module.exports = {
    uploadFile,
    getFiles,
    getFileById,
    deleteById,
    updateById
};
