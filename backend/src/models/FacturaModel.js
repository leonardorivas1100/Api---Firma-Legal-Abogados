import mongoose from "mongoose";
import Proceso from "./ProcessModel.js";

const facturaSchema = new mongoose.Schema({
    id_factura: {
        type: Number,
        required: true,
        unique: true,
    },

    monto: {
        type: String,
        required: true,
    },

    fecha_emision: {
        type: Date,
        required: true,
    },

    fecha_vencimiento: {
        type: Date,
        required: true,
    },

    estado: {
        type: String,
        required: true,
        enum:['sin cancelar', 'cancelada'],
    },

    metodo_pago: {
        type: String,
        required: true,
        enum:['efectivo', 'credito', 'transferencia'],
    },

    id_proceso: {
        type: Number,
        ref: Proceso,
        required: true,
    },
}, { timestamps: true });

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;