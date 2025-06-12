import Joi from "joi";

// Esquema de validación para crear una factura 
export const createFacturaSchema = Joi.object({
  id_factura: Joi.number().required().messages({
    'any.required': 'El ID de la factura es obligatorio.',
    'number.base': 'El ID de la factura debe ser un número.',
  }),
  monto: Joi.string().required().messages({
    'any.required': 'El monto de la factura es obligatorio.',
  }),
  fecha_emision: Joi.date().required().messages({
    'any.required': 'La fecha de emisión es obligatoria.',
    'date.base': 'La fecha de emisión debe ser una fecha válida.',
  }),
  fecha_vencimiento: Joi.date().required().messages({
    'any.required': 'La fecha de vencimiento es obligatoria.',
    'date.base': 'La fecha de vencimiento debe ser una fecha válida.',
  }),
  estado: Joi.string().valid('sin cancelar', 'cancelada').required().messages({
    'any.required': 'El estado es obligatorio.',
    'any.only': 'El estado debe ser "sin cancelar" o "cancelada".',
  }),
  metodo_pago: Joi.string().valid('efectivo', 'credito', 'transferencia').required().messages({
    'any.required': 'El método de pago es obligatorio.',
    'any.only': 'El estado debe ser "efectivo", "credito" o "transferencia"',
  }),
  id_proceso: Joi.number().required().messages({
    'any.required': 'El id del proceso es obligatorio.',
    'number.base': 'El id del proceso debe ser un número válido.',
  }),
});

// Esquema de validación para editar una factura
export const updateFacturaSchema = Joi.object({
  monto: Joi.string().optional().messages({
    'any.required': 'El monto de la factura es obligatorio.',
  }),
  fecha_emision: Joi.date().optional().messages({
    'date.base': 'La fecha de emisión debe ser una fecha válida.',
  }),
  fecha_vencimiento: Joi.date().optional().messages({
    'date.base': 'La fecha de vencimiento debe ser una fecha válida.',
  }),
  estado: Joi.string().valid('sin cancelar', 'cancelada').optional().messages({
    'any.only': 'El estado debe ser "sin cancelar" o "cancelada".',
  }),
  metodo_pago: Joi.string().valid('efectivo', 'credito', 'transferencia').optional().messages({
    'any.only': 'El estado debe ser "efectivo", "credito" o "transferencia"',
  }),
  id_proceso: Joi.number().optional().messages({
    'number.base': 'El id del proceso debe ser un número válido.',
  }),
});

// Esquema de validación para obtener todas las facturas
export const getAllFacturasSchema = Joi.object({
  estado: Joi.string().valid('sin cancelar', 'cancelada').optional().messages({
    'any.only': 'El estado debe ser "sin cancelar" o "cancelada".',
  }),
  metodo_pago: Joi.string().valid('efectivo', 'credito', 'transferencia').optional().messages({
    'any.only': 'El estado debe ser "efectivo", "credito" o "transferencia"',
  }),
  id_proceso: Joi.number().optional().messages({
    'number.base': 'El proceso debe ser un número.',
  }),
});

// Esquema de validación para obtener una factura por ID
export const getFacturaByIdSchema = Joi.object({
    id_factura: Joi.number().required().messages({
      'any.required': 'El ID de la factura es obligatorio.',
      'number.base': 'El ID de la factura debe ser un número.',
    }),
  }).unknown(true);  // Permite parámetros de ruta (params)
  
  // Esquema de validación para eliminar una factura
  export const deletefacturaSchema = Joi.object({
    id_factura: Joi.number().required().messages({
      'any.required': 'El ID de la factura es obligatorio.',
      'number.base': 'El ID de la factura debe ser un número.',
    }),
  }).unknown(true);  // Permite parámetros de ruta (params)
  