const Product= require('../models/producto.model');

const registerProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        const newProduct = new Product({ nombre, descripcion, precio, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Producto registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar producto', error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const productos = await Product.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        // Actualizar el producto con los datos enviados
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, stock },
            { new: true, runValidators: true } // Devuelve el producto actualizado y aplica validaciones
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
        const deletedProduct = await Product.findByIdAndDelete(id); // Buscar y eliminar el producto por su ID

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = { registerProduct, getProduct, updateProduct, deleteProduct};
