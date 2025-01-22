const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-seguro';

// auth.controller.js
// En auth.controller.js
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // 1. Verificar si el usuario existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // 2. Crear usuario en auth
    const user = new User({ email, password, name });
    await user.save();

    // 3. Crear el token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    
    // 4. Crear usuario en el servicio de usuarios
    try {
      const usuarioResponse = await fetch('http://usuario-service:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          authId: user._id,
          email: user.email,
          name: user.name
        })
      });

      if (!usuarioResponse.ok) {
        // Si falla la creación en el servicio de usuarios, eliminamos el usuario de auth
        await User.findByIdAndDelete(user._id);
        throw new Error('Error al crear el perfil de usuario');
      }

      await usuarioResponse.json();
    } catch (error) {
      // Si falla la creación en el servicio de usuarios, eliminamos el usuario de auth
      await User.findByIdAndDelete(user._id);
      throw new Error('Error al crear el perfil de usuario: ' + error.message);
    }

    res.status(201).json({ 
      token, 
      user: { id: user._id, email: user.email, name: user.name } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};