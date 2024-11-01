// src/services/authService.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return null; // Si no existe el usuario

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null; // Contraseña incorrecta

    return user; // Retorna el usuario si la autenticación es exitosa
};
