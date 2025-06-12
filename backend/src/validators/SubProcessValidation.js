import Joi from 'joi';

// Esquema de validación para crear un subproceso
export const createSubprocesoSchema = Joi.object({
  id_subproceso: Joi.number().required().messages({
    'any.required': 'El ID del tipo de proceso es obligatorio.',
    'number.base': 'El ID del tipo de proceso debe ser un número.',
  }),

  id_tipo: Joi.number().required().messages({
    'any.required': 'El ID del tipo de proceso es obligatorio.',
    'number.base': 'El ID del tipo de proceso debe ser un número.',
  }),
  
  nombre: Joi.string().required().messages({
    'any.required': 'El nombre del subproceso es obligatorio.',
  }),
});


// Esquema de validación para obtener un subproceso por ID
export const getSubprocesoByIdSchema = Joi.object({
  id_subproceso: Joi.number().required().messages({
    'any.required': 'El ID del subproceso es obligatorio.',
    'number.base': 'El ID del subproceso debe ser un número.',
  }),
});

// Esquema de validación para eliminar un subproceso
export const deleteSubprocesoSchema = Joi.object({
  id_subproceso: Joi.number().required().messages({
    'any.required': 'El ID del subproceso es obligatorio.',
    'number.base': 'El ID del subproceso debe ser un número.',
  }),
});
