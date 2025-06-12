import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  id_rol: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
    enum: ['abogado', 'asistente', 'cliente'],
    unique: true,
  },
});

const Rol = mongoose.model('Rol', rolSchema);

export default Rol;  
