import Joi from "joi";

//Esquema de validacion para crear una factura
export const createAgendaSchema = Joi.object({
  fecha: Joi.date().required().messages({
    "any.required": "La fecha es obligatoria.",
    "date.base": "La fecha debe ser una fecha válida.",
  }),

  hora: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .required()
    .messages({
      "any.required": "La hora es obligatoria.",
      "string.base": "La hora debe ser válida.",
      "string.pattern.base": "La hora debe tener el formato HH:mm",
    }),

  descripcion: Joi.string().min(3).required().messages({
    "string.min": "La descripción debe tener al menos 3 caracteres.",
    "any.required": "La descripción es obligatoria.",
  }),

  estado: Joi.string().valid("programada", "cancelada").required().messages({
    "any.required": "El estado es obligatorio.",
    "any.only": 'El estado debe ser "programada" o "cancelada".',
  }),

  id_proceso: Joi.number().required().messages({
    "any.required": "El id del proceso es obligatorio.",
    "number.base": "El id del proceso debe ser un número válido.",
  }),
});

//Esquema de validacion para editar una factura
export const updateAgendaSchema = Joi.object({
  fecha: Joi.date().optional().messages({
    "date.base": "La fecha debe ser una fecha válida.",
  }),

  hora: Joi.string().optional().messages({
    "string.base": "La hora debe ser válida.",
  }),

  descripcion: Joi.string().optional().messages({
    "any.required": "La descripcion de la agenda es obligatoria.",
  }),

  estado: Joi.string().valid("programada", "cancelada").optional().messages({
    "any.only": 'El estado debe ser "programada" o "cancelada".',
  }),

  // Añade la validación para id_proceso
  id_proceso: Joi.number().optional().messages({
    "number.base": "El ID del proceso debe ser un número.",
  }),
});

// Esquema de validación para obtener una agenda por ID
export const getAgendaByIdSchema = Joi.object({
  id_agenda: Joi.number().required().messages({
    "any.required": "El ID de la agenda es obligatorio.",
    "number.base": "El ID de la agenda debe ser un número.",
  }),
}).unknown(true); // Permite parámetros de ruta (params)

// Esquema de validación para eliminar una agenda
export const deleteAgendaSchema = Joi.object({
  id_agenda: Joi.number().required().messages({
    "any.required": "El ID de la agenda es obligatorio.",
    "number.base": "El ID de la agenda debe ser un número.",
  }),
}).unknown(true); // Permite parámetros de ruta (params)
