// src/validators/TipoProcessValidation.js
import Joi from 'joi';

// Esquema de validación para crear un tipo de proceso
export const createTipoProcessSchema = Joi.object({
  id_tipo: Joi.number().required().messages({
    'any.required': 'El ID del tipo de proceso es obligatorio.',
    'number.base': 'El ID del tipo de proceso debe ser un número.',
  }),
  
  nombre: Joi.string().valid('Notariales', 'Juzgados', 'Curadurías').required().messages({
    'any.required': 'El nombre del tipo de proceso es obligatorio.',
    'any.only': 'El nombre debe ser "Notariales", "Juzgados" o "Curadurías".',
  }),
});

// Esquema de validación para obtener un tipo de proceso por ID
export const getTipoProcessByIdSchema = Joi.object({
  id_tipo: Joi.number().required().messages({
    'any.required': 'El ID del tipo de proceso es obligatorio.',
    'number.base': 'El ID del tipo de proceso debe ser un número.',
  }),
});

// Esquema de validación para eliminar un tipo de proceso
export const deleteTipoProcessSchema = Joi.object({
  id_tipo: Joi.number().required().messages({
    'any.required': 'El ID del tipo de proceso es obligatorio.',
    'number.base': 'El ID del tipo de proceso debe ser un número.',
  }),
});
