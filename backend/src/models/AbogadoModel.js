import mongoose from 'mongoose';
import Usuario from './UsersModel.js'; // Importamos el modelo de Usuario

// Esquema del modelo Abogado
const abogadoSchema = new mongoose.Schema({
  especialidad: { 
    type: String, 
    required: true 
  },
  area_juridica: { 
    type: String, 
    required: true 
  },
  experiencia: {
    type: String,
    required: true 
  },
  
  // Campo para el número de identificación, el cual será único
  numeroIdentificacion: { 
    type: String, 
    required: true, 
    unique: true,
  },
  
  // Asociamos el número de identificación del usuario a través del campo `numeroIdentificacion`
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Usuario,  
    required: true 
  }
}, { timestamps: true }); 

// Crear el modelo 'Abogado' a partir del esquema
const Abogado = mongoose.model('Abogado', abogadoSchema);

export default Abogado;
