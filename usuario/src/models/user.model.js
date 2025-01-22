// user.model.js en el servicio de usuarios
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    email: {  // Cambiamos correo por email para mantener consistencia
        type: String,
        required: true,
        unique: true
    },
    name: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);