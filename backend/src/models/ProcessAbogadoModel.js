import mongoose from "mongoose";
import Proceso from "./ProcessModel.js";

const procesoAbogadoSchema = new mongoose.Schema({
    id_procesoabogado: {
        type: Number,
        required: true,
        unique: true,
    },

    numeroIdentificacion: {
        type: Number,
        required: true,
    },

    id_proceso: {
        type: Number,
        ref: Proceso,
        required: true,
    },

}, { timestamps: true });

const ProcesoAbogado = mongoose.model('ProcesoAbogado', procesoAbogadoSchema);

export default ProcesoAbogado;