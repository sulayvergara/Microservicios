// user.controller.js
const User = require('../models/user.model');

// user.controller.js en el servicio de usuarios
const createUser = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const { authId, email, name } = req.body;
        
        // Verificar que todos los campos necesarios estén presentes
        if (!authId || !email || !name) {
            return res.status(400).json({ 
                message: 'Faltan campos requeridos', 
                received: { authId, email, name } 
            });
        }

        const newUser = new User({ authId, email, name });
        const savedUser = await newUser.save();
        console.log('Usuario creado:', savedUser);
        res.status(201).json({ message: 'Usuario creado exitosamente', user: savedUser });
    } catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-authId'); // Excluimos authId por seguridad
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};


// Función para obtener un usuario específico
const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const user = await User.findById(id); // Buscar usuario por ID en la base de datos

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user); // Devolver el usuario encontrado
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // O req.params, según prefieras
        const { name, email } = req.body;

        // Buscar y actualizar usuario por el ID
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true } // Devuelve el usuario actualizado y aplica validaciones
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
        const deletedUser = await User.findByIdAndDelete(id); // Buscar y eliminar el usuario por su ID

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {createUser, getUsers, getUserById, updateUser ,deleteUser};