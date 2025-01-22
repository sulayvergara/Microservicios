const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { registerProduct, getProduct , updateProduct, deleteProduct} = require('../controllers/producto.controller');
const router = express.Router();

router.post('/registrar',verifyToken, registerProduct);
router.get('/obtener', getProduct);//,verifyToken
router.put('/actualizar/:id',verifyToken, updateProduct);
router.delete('/eliminar/:id', deleteProduct);

module.exports = router;