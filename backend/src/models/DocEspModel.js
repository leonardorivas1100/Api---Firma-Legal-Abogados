import mongoose from "mongoose";
import Subproceso from "./SubProcessModel.js";

//Esquema del DocEsp
const DocEspSchema = new mongoose.Schema({
    id_docesp:  {
        type: Number,
        required: true,
        unique: true,
    },
    id_subproceso: {
        type: Number,
        required: true,
        ref: Subproceso,
    },
    nombre: {
        type: [String],
        required: true,
      }

    }, { timestamps: true });
    
    // Crear el modelo
    const DocEsp = mongoose.model('DocEsp', DocEspSchema, 'DocEsp');
    export default DocEsp;
