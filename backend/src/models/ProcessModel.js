import mongoose from "mongoose";
import Cliente from "./ClienteModel.js";
import Abogado from "./AbogadoModel.js";
import TipoProcess from "./TipoProcessModel.js";
import DocEsp from "./DocEspModel.js";
import Subproceso from "./SubProcessModel.js";

const procesoSchema = new mongoose.Schema(
  {
    id_proceso: {
      type: Number,
      required: true,
      unique: true,
    },

    descripcion: {
      type: String,
      required: true,
      minlength: 3,
    },

    fecha_inicio: {
      type: Date,
      required: true,
    },

    estado: {
      type: String,
      required: true,
      enum: ["activo", "inactivo"],
    },

    numeroIdentificacionCliente: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 10,
      match: [
        /^\d{7,10}$/,
        "El número de identificación debe contener solo dígitos",
      ],
      validate: {
        validator: async function (value) {
          const cliente = await Cliente.findOne({
            numeroIdentificacion: value,
          });
          return cliente != null;
        },
        message: "El cliente con este número de identificación no existe",
      },
    },

    numeroIdentificacionAbogado: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 10,
      match: [
        /^\d{7,10}$/,
        "El número de identificación debe contener solo dígitos",
      ],
      validate: {
        validator: async function (value) {
          const abogado = await Abogado.findOne({
            numeroIdentificacion: value,
          });
          return abogado != null;
        },
        message: "El abogado con este número de identificación no existe",
      },
    },

    id_tipo: {
      type: Number,
      ref: TipoProcess,
      required: true,
    },

    id_subproceso: {
      type: Number,
      ref: Subproceso,
      required: false,
    },

    id_docesp: {
      type: Number,
      ref: DocEsp,
      required: false,
    },
  },
  { timestamps: true }
);

const Proceso = mongoose.model("Proceso", procesoSchema);

export default Proceso;
