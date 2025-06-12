import mongoose from 'mongoose';
import TipoProcess from './TipoProcessModel.js';

// Esquema del subproceso
const subprocesoSchema = new mongoose.Schema({
  id_subproceso: {
    type: Number, 
    required: true,
    unique: true,  // Asegura que no se repitan los id_subproceso
  },
  id_tipo: {
    type: Number, // Ahora es un número, como se define en el modelo TipoProcess
    required: true,
    ref: TipoProcess,
  },
  nombre: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Crear el modelo
const Subproceso = mongoose.model('Subproceso', subprocesoSchema, 'subprocesos');
export default Subproceso;
