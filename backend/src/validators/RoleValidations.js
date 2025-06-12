import Joi from 'joi';

// Esquema de validación para crear un rol
const rolValidation = Joi.object({
  id_rol: Joi.number()
    .required()
    .not(null)  // Evita que sea null
    .messages({
      'any.required': 'El ID del rol es obligatorio.',
      'number.base': 'El ID del rol debe ser un número.',
      'any.invalid': 'El ID del rol no puede ser null.',
    }),

  nombre: Joi.string()
    .valid('abogado', 'asistente', 'cliente')  // Solo permite estos tres valores
    .required()
    .messages({
      'string.base': 'El campo nombre debe ser un texto.',
      'any.required': 'El campo nombre es obligatorio.',
      'any.only': 'El campo nombre debe ser uno de los siguientes valores: abogado, asistente, cliente.',
    }),
});

export { rolValidation };
