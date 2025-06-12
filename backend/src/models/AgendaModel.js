import mongoose from "mongoose";
import Proceso from "./ProcessModel.js";

const agendaSchema = new mongoose.Schema(
  {
    id_agenda: {
      type: Number,
      required: true,
      unique: true,
    },

    fecha: {
      type: Date,
      required: true,
    },

    hora: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    estado: {
      type: String,
      required: true,
      enum: ["programada", "cancelada"],
    },

    id_proceso: {
      type: Number,
      required: true,
      ref: Proceso,
    },
  },
  { timestamps: true }
);

const Agenda = mongoose.model("Agenda", agendaSchema);

export default Agenda;
