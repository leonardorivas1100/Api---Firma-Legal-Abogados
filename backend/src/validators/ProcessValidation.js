import Joi from "joi";

// Esquema de validación para crear un proceso
export const createProcesoSchema = Joi.object({
  id_proceso: Joi.number().required().messages({
    "any.required": "El ID del proceso es obligatori",
    "number.base": "El ID del proceso debe ser un número.",
  }),

  descripcion: Joi.string().min(3).required().messages({
    "string.min": "La descripción debe tener al menos 3 caracteres.",
    "any.required": "La descripción es obligatoria.",
  }),

  fecha_inicio: Joi.date().required().messages({
    "any.required": "La fecha de inicio es obligatoria.",
    "date.base": "La fecha de inicio debe ser una fecha válida.",
  }),

  estado: Joi.string().valid("activo", "inactivo").required().messages({
    "any.required": "El estado es obligatorio.",
    "any.only": 'El estado debe ser "activo" o "inactivo".',
  }),

  numeroIdentificacionCliente: Joi.string()
    .pattern(/^\d{7,10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "El número de identificación del cliente debe tener entre 7 y 10 dígitos.",
      "any.required": "El número de identificación del cliente es obligatorio.",
    }),

  numeroIdentificacionAbogado: Joi.string()
    .pattern(/^\d{7,10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "El número de identificación del abogado debe tener entre 7 y 10 dígitos.",
      "any.required": "El número de identificación del abogado es obligatorio.",
    }),

  id_tipo: Joi.number().required().messages({
    "any.required": "El tipo es obligatorio.",
    "number.base": "El tipo debe ser un número válido.",
  }),

  id_subproceso: Joi.string().optional().messages({
    "number.base": "El id_subproceso debe ser un número válido.",
  }),

  id_documento: Joi.string().optional().messages({
    "number.base": "El id_documentoun debe ser un número válido",
  }),
});

// Esquema de validación para obtener todos los procesos (opcionalmente por estado o tipo)
export const getAllProcesosSchema = Joi.object({
  estado: Joi.string().valid("activo", "inactivo").optional().messages({
    "any.only": 'El estado debe ser "activo" o "inactivo".',
  }),

  id_tipo: Joi.number().optional().messages({
    "number.base": "El tipo debe ser un número.",
  }),
});

// Esquema de validación para obtener un proceso por ID
export const getProcesoByIdSchema = Joi.object({
  id_proceso: Joi.alternatives()
    .try(Joi.number().required(), Joi.string().pattern(/^\d+$/).required())
    .messages({
      "any.required": "El ID del proceso es obligatorio.",
      "number.base": "El ID del proceso debe ser un número.",
      "string.pattern.base": "El ID del proceso debe contener solo dígitos.",
    }),
});

// Esquema de validación para eliminar un proceso
export const deleteProcesoSchema = Joi.object({
  id_proceso: Joi.number().required().messages({
    "any.required": "El ID del proceso es obligatorio.",
    "number.base": "El ID del proceso debe ser un número.",
  }),
});
