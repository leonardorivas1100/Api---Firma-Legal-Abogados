import mongoose from 'mongoose';
import Usuario from './UsersModel.js';  // Asegúrate de usar el modelo de Usuario

const clienteSchema = new mongoose.Schema({
  numeroIdentificacion: { 
    type: String, 
    required: true, 
    unique: true,  // El número de identificación debe ser único para cada cliente
  },
  direccion: { 
    type: String, 
    required: true,  // El cliente debe tener una dirección
  },
  estado: { 
    type: String, 
    enum: ['activo', 'inactivo'], 
    default: 'activo' 
  },
  estado_cliente: { 
    type: String, 
    enum: ['potencial', 'cliente'], 
    default: 'potencial' 
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,  // Referencia al modelo Usuario
    ref: Usuario,  // Hacemos referencia al modelo de Usuario
    required: true  // El campo usuario es obligatorio
  }
}, { timestamps: true });  // Esto agrega automáticamente los campos 'createdAt' y 'updatedAt'


const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
