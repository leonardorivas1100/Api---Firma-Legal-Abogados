import Joi from "joi";

//Esquema de validación para crear un DocEsp
export const createDocEspSchema = Joi.object({
    id_docesp: Joi.number().required().messages({
        'any.required': 'El ID del DocEsp es obligatorio.',
        'number.base': 'El ID del DocEsp debe ser un número.',
    }),
    
    id_subproceso: Joi.number().required().messages({
        'any.required': 'El ID del tipo de proceso es obligatorio.',
        'number.base': 'El ID del tipo de proceso debe ser un número.',
    }),
      
    nombre: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'El nombre del subproceso es obligatorio.',
    }),
});


//Esquema de validation para obtener un DocEsp por ID
export const getDocEspByIdSchema = Joi.object({
    id_DocEsp: Joi.number().required().messages({
        'any.required': 'El ID del DocEsp es obligatorio.',
        'number.base': 'El ID del DocEsp debe ser un número.',
    })
})

//Esquema de validacion para eliminar un DocEsp
export const deleteDocEspSchema = Joi.object({
    id_DocEsp: Joi.number().required().messages({
        'any.required': 'El ID del DocEsp es obligatorio.',
        'number.base': 'El ID del DocEsp debe ser un número.',
    })
})
