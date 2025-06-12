import Joi from 'joi';

// Esquema de validación para la creación de un cliente
export const createClienteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
  direccion: Joi.string().required().messages({
    'any.required': 'La dirección es obligatoria.'
  }),
  estado: Joi.string().valid('activo', 'inactivo').default('activo').messages({
    'any.only': 'El estado debe ser "activo" o "inactivo".'
  }),
  estado_cliente: Joi.string().valid('potencial', 'cliente').default('potencial').messages({
    'any.only': 'El estado del cliente debe ser "potencial" o "cliente".'
  }),
});

// Esquema de validación para la actualización de un cliente
export const updateClienteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).optional().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
  }),
  direccion: Joi.string().optional().messages({
    'any.required': 'La dirección es obligatoria.'
  }),
  estado: Joi.string().valid('activo', 'inactivo').optional().default('activo').messages({
    'any.only': 'El estado debe ser "activo" o "inactivo".'
  }),
  estado_cliente: Joi.string().valid('potencial', 'cliente').optional().default('potencial').messages({
    'any.only': 'El estado del cliente debe ser "potencial" o "cliente".'
  }),
  usuario: Joi.string().min(7).max(10).optional().messages({
    'string.min': 'El número de identificación del usuario debe tener al menos 7 caracteres.',
    'string.max': 'El número de identificación del usuario no puede tener más de 10 caracteres.',
  }),
});

// Esquema de validación para obtener un cliente por su número de identificación
export const getClienteSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  })
});

// Validación para obtener todos los clientes
export const getClientesSchema = Joi.object({
  // Aquí no necesitamos parámetros, pero sí un validador para la autenticación
    'string.pattern.base': 'El token de autenticación es inválido.',
    'any.required': 'El token de autenticación es obligatorio.',
  });