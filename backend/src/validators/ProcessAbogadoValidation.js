import Joi from 'joi';

// Esquema de validación para la creación de un nuevo proceso-abogado
export const createProcesoAbogadoSchema = Joi.object({
    id_procesoabogado: Joi.number().required().messages({
        'any.required': 'El ID del proceso abogado es obligatorio.',
        'number.base': 'El ID del proceso abogado debe ser un número válido.',
    }),

    numeroIdentificacion: Joi.number().required().messages({
        'any.required': 'El número de identificación del abogado es obligatorio.',
        'number.base': 'El número de identificación del abogado debe ser un número válido.',
    }),

    id_proceso: Joi.number().required().messages({
        'any.required': 'El ID del proceso es obligatorio.',
        'number.base': 'El ID del proceso debe ser un número válido.',
    }),
});

// Esquema de validación para editar un proceso-abogado
export const updateProcesoAbogadoSchema = Joi.object({
    id_procesoabogado: Joi.number().optional().messages({
        'number.base': 'El ID del proceso abogado debe ser un número válido.',
    }),

    numeroIdentificacion: Joi.number().optional().messages({
        'number.base': 'El número de identificación del abogado debe ser un número válido.',
    }),

    id_proceso: Joi.number().optional().messages({
        'number.base': 'El ID del proceso debe ser un número válido.',
    }),
});

//Esquema de validacion para obtener todos los proceso-abogados
export const getAllProcesoAbogadosSchema = Joi.object({
  id_proceso: Joi.number().optional()  // Esto hace que `id_proceso` sea opcional
});

// Esquema de validación para obtener un proceso-abogado por ID
export const getProcesoAbogadoByIdSchema = Joi.object({
    id_procesoabogado: Joi.number().required().messages({
        'any.required': 'El ID del proceso abogado es obligatorio.',
        'number.base': 'El ID del proceso abogado debe ser un número válido.',
    }),
});

// Esquema de validación para eliminar un proceso-abogado por ID
export const deleteProcesoAbogadoSchema = Joi.object({
    id_procesoabogado: Joi.number().required().messages({
        'any.required': 'El ID del proceso abogado es obligatorio.',
        'number.base': 'El ID del proceso abogado debe ser un número válido.',
    }),
});
