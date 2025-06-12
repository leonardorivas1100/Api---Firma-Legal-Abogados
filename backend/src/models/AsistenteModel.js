import mongoose from 'mongoose';
import Usuario from './UsersModel.js'; 

const asistenteSchema = new mongoose.Schema({
  numeroIdentificacion: { 
    type: String,  
    required: true, 
    unique: true,
  },
  // Relación con el modelo de Usuario, a través del número de identificación
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Usuario, 
    required: true
  }
}, { timestamps: true });

const Asistente = mongoose.model('Asistente', asistenteSchema);

export default Asistente;
