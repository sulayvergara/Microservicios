const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
        });
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
