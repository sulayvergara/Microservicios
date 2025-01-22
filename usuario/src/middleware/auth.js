// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        // Verificar token con el servicio de auth
        const response = await fetch('http://auth-usuario-service:3002/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido');
        }
        
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error: error.message });
    }
};

module.exports = { verifyToken };