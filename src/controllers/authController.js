// src/controllers/authController.js
const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Aquí puedes generar un token JWT si es necesario
        // const token = generateToken(user); // Implementa esta función según tu necesidad

        res.json({ message: 'Inicio de sesión exitoso', user }); // o devuelve el token
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
