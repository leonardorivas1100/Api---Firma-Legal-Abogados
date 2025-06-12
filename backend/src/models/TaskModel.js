import mongoose from "mongoose";
import { type } from "os";

const taskSchema = new mongoose.Schema(
  {
    id_tarea: {
      type: Number,
      required: true,
      unique: true,
    },
    titulo: {
      type: String,
      required: true,
      minlength: 3,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora_inicio: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    },
    hora_fin: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    },
    estado: {
      type: String,
      required: true,
      enum: ["Pendiente", "En progreso", "Resultado", "En revisión"],
      default: "Pendiente",
    },
    todo_el_dia: {
      type: Boolean,
      required: false,
    },
    vincular_expediente: {
      type: Boolean,
      required: false,
    },
    asociar_directorios: {
      type: Boolean,
      required: false,
    },
    asignado_a: {
      type: String,
    },
    id_proceso: {
      type: Number,
      ref: "Proceso",
    },
    creado_por: {
      type: String,
      required: true,
      default: "Sistema",
    },
  },
  { timestamps: true }
);

const Tarea = mongoose.model("Tarea", taskSchema);

export default Tarea;
