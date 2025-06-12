import Joi from "joi";

export const createTaskSchema = Joi.object({
  id_tarea: Joi.number().required().messages({
    "any.required": "El ID de la tarea es obligatorio.",
    "number.base": "El ID de la tarea debe ser un número.",
  }),
  titulo: Joi.string().min(3).required().messages({
    "string.min": "El título debe tener al menos 3 caracteres.",
    "any.required": "El título es obligatorio.",
  }),
  descripcion: Joi.string().required().messages({
    "any.required": "La descripción es obligatoria.",
  }),
  fecha: Joi.date().required().messages({
    "any.required": "La fecha es obligatoria.",
    "date.base": "La fecha debe ser válida.",
  }),
  hora_inicio: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .required()
    .messages({
      "any.required": "La hora de inicio es obligatoria.",
      "string.pattern.base": "La hora debe tener formato HH:mm",
    }),
  hora_fin: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .required()
    .messages({
      "any.required": "La hora de fin es obligatoria.",
      "string.pattern.base": "La hora debe tener formato HH:mm",
    }),
  estado: Joi.string()
    .valid("Pendiente", "En progreso", "Resultado", "En revisión")
    .required()
    .messages({
      "any.required": "El estado es obligatorio.",
      "any.only":
        "El estado debe ser uno de: Pendiente, En progreso, Resultado, En revisión",
    }),
  todo_el_dia: Joi.boolean().default(false),
  vincular_expediente: Joi.boolean().default(false),
  asociar_directorios: Joi.boolean().default(false),
  asignado_a: Joi.string().optional(),
  id_proceso: Joi.number().optional(),
  creado_por: Joi.number().optional(),
});

export const updateTaskSchema = Joi.object({
  titulo: Joi.string().min(3).optional(),
  descripcion: Joi.string().optional(),
  fecha: Joi.date().optional(),
  hora_inicio: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .optional(),
  hora_fin: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .optional(),
  estado: Joi.string()
    .valid("Pendiente", "En progreso", "Resultado", "En revisión")
    .optional(),
  todo_el_dia: Joi.boolean().optional(),
  vincular_expediente: Joi.boolean().optional(),
  asociar_directorios: Joi.boolean().optional(),
  asignado_a: Joi.string().optional(),
  id_proceso: Joi.number().optional(),
});

export const getAllTasksSchema = Joi.object({
  estado: Joi.string()
    .valid("Pendiente", "En progreso", "Resultado", "En revisión")
    .optional(),
  id_proceso: Joi.number().optional(),
  asignado_a: Joi.string().optional(),
});

export const getTaskByIdSchema = Joi.object({
  id_tarea: Joi.number().required().messages({
    "any.required": "El ID de la tarea es obligatorio.",
    "number.base": "El ID de la tarea debe ser un número.",
  }),
}).unknown(true);

export const deleteTaskSchema = Joi.object({
  id_tarea: Joi.number().required().messages({
    "any.required": "El ID de la tarea es obligatorio.",
    "number.base": "El ID de la tarea debe ser un número.",
  }),
}).unknown(true);
