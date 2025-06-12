import Joi from 'joi';

// Esquema de validación para crear un asistente
export const createAsistenteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});

// Esquema de validación para la actualización de un asistente
export const updateAsistenteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).optional().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
  }),
});


// Esquema de validación para obtener un asistente por su número de identificación
export const getAsistenteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});
