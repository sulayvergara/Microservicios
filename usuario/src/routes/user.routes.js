const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { createUser, getUsers, getUserById,  updateUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

// Todas las rutas protegidas con verifyToken
router.post('/', createUser);
router.get('/', verifyToken, getUsers);
router.get('/perfil/:id',verifyToken  ,getUserById);//,
router.put('/actualizar/:id', verifyToken, updateUser);
router.delete('/eliminar/:id', deleteUser);//verifyToken

module.exports = router;