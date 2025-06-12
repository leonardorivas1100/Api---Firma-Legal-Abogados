import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  
import Rol from "./RoleModel.js";  

// Esquema del modelo Usuario
const usuarioSchema = new mongoose.Schema({

  numeroIdentificacion: {
    type: String,    
    required: true,
    unique: true,  
  },

  nombres: { 
    type: String,
    required: true
  },

  apellidos: { 
    type: String,
    required: true 
  },

  telefono: {
    type: String,
    required: true,
    unique: true,  
  },

  email: {
    type: String,
    required: true,
    unique: true,  
  },
  
  password: { 
    type: String, 
    required: true 
  },

  id_rol: {
    type: Number,  
    required: true,
    ref: Rol.name,
  },
  
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Crear el modelo 'Usuario' a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
