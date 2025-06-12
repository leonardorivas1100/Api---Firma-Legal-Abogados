import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Validar si la variable de entorno MONGODB_URI está definida
if (!process.env.MONGODB_URI) {
    console.error("Falta la variable de entorno MONGODB_URI en el archivo .env");
    process.exit(1); // Detenemos la ejecución si no está definida
}

const port = process.env.PORT || 9000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MONGODB');
    } catch (error) {
        console.error(`Ocurrió un error al conectarse: ${error.message}`);
        process.exit(1);
    }
};


connectDB();

export { port };
