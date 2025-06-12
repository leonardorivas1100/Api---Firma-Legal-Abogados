import Joi from 'joi';

// Esquema de validación para crear un abogado
export const createAbogadoSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
  especialidad: Joi.string().min(3).required().messages({
    'string.min': 'La especialidad debe tener al menos 3 caracteres.',
    'any.required': 'La especialidad es obligatoria.'
  }),
  area_juridica: Joi.string().min(3).required().messages({
    'string.min': 'El área jurídica debe tener al menos 3 caracteres.',
    'any.required': 'El área jurídica es obligatoria.'
  }),
  experiencia: Joi.string().min(3).required().messages({
    'string.min': 'La experiencia debe tener al menos 3 caracteres.',
    'any.required': 'La experiencia es obligatoria.'
  }),
});

// Esquema de validación para la actualización de un abogado
export const updateAbogadoSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).optional().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
  }),
  especialidad: Joi.string().min(3).optional().messages({
    'string.min': 'La especialidad debe tener al menos 3 caracteres.',
  }),
  area_juridica: Joi.string().min(3).optional().messages({
    'string.min': 'El área jurídica debe tener al menos 3 caracteres.',
  }),
  experiencia: Joi.string().min(3).optional().messages({
    'string.min': 'La experiencia debe tener al menos 3 caracteres.',
  }),
  usuario: Joi.string().min(7).max(10).optional().messages({
    'string.min': 'El número de identificación del usuario debe tener al menos 7 caracteres.',
    'string.max': 'El número de identificación del usuario no puede tener más de 10 caracteres.',
  }),
});

// Esquema de validación para obtener un abogado por su número de identificación
export const getAbogadoSchema = Joi.object({
 
});

