import Joi from 'joi';

export const createUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
  nombres: Joi.string().min(3).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'any.required': 'El nombre es obligatorio.'
  }),
  apellidos: Joi.string().min(3).required().messages({
    'string.min': 'El apellido debe tener al menos 3 caracteres.',
    'any.required': 'El apellido es obligatorio.'
  }),
  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'El teléfono debe tener 10 dígitos.',
    'any.required': 'El teléfono es obligatorio.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
    'any.required': 'La contraseña es obligatoria.'
  }),
  // Validación de ObjectId para el rol
  id_rol: Joi.number().required().messages({
    'any.required': 'El rol es obligatorio.',
    'number.base': 'El rol debe ser un número válido.',
  }),
  
  
});

// Esquema de validación para la actualización de un usuario
export const updateUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).optional().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
  }),
  nombres: Joi.string().min(3).optional().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
  }),
  apellidos: Joi.string().min(3).optional().messages({
    'string.min': 'El apellido debe tener al menos 3 caracteres.',
  }),
  telefono: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
    'string.pattern.base': 'El teléfono debe tener 10 dígitos.',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'El correo electrónico debe ser válido.',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
  }),
  // Aquí cambiamos la validación para que también acepte un ObjectId de MongoDB para el rol
  id_rol: Joi.number().required().messages({
    'any.required': 'El rol es obligatorio.',
    'number.base': 'El rol debe ser un número válido.',
  }),
});

// Esquema de validación para obtener un usuario por su número de identificación
export const getUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});

// Esquema de validación para eliminar un usuario por su número de identificación
export const deleteUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});

// Esquema de validación para el login de un usuario
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
    'any.required': 'La contraseña es obligatoria.'
  }),
});