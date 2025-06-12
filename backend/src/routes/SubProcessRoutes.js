import express from 'express';
import {
  crearSubproceso,
  obtenerSubprocesos,
  obtenerSubproceso,
  eliminarSubproceso,
  obtenerSubprocesosPorTipo
} from '../controllers/SubProcessController.js';

import { createSubprocesoSchema, getSubprocesoByIdSchema, deleteSubprocesoSchema } from '../validators/SubProcessValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js';

const subProcessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subprocesos
 *   description: Operaciones sobre los subprocesos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Se utiliza para autenticar las peticiones mediante JWT.
 *   schemas:
 *     Subproceso:
 *       type: object
 *       properties:
 *         id_subproceso:
 *           type: number
 *           description: ID único del subproceso.
 *         id_tipo:
 *           type: number
 *           description: ID del tipo de proceso al que pertenece el subproceso.
 *         nombre:
 *           type: string
 *           description: Nombre del subproceso.
 *       required:
 *         - id_subproceso
 *         - id_tipo
 *         - nombre
 */

/**
 * @swagger
 * /api/subprocesos:
 *   post:
 *     summary: Crear un nuevo subproceso
 *     description: Crea un nuevo subproceso asociando a un tipo de proceso.
 *     tags: [Subprocesos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subproceso'
 *     responses:
 *       201:
 *         description: Subproceso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
subProcessRouter.post(
  '/', 
  verifyToken, 
  verifyRole(['asistente']), 
  validatorHandler(createSubprocesoSchema, 'body'),
  crearSubproceso
);

/**
 * @swagger
 * /api/subprocesos:
 *   get:
 *     summary: Obtener todos los subprocesos
 *     description: Obtiene una lista de todos los subprocesos.
 *     tags: [Subprocesos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de subprocesos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subproceso'
 *       500:
 *         description: Error interno en el servidor
 */
subProcessRouter.get(
  '/', 
  verifyToken, 
  verifyRole(['asistente', 'abogado']), 
  obtenerSubprocesos
);

/**
 * @swagger
 * /api/subprocesos/{id_subproceso}:
 *   get:
 *     summary: Obtener un subproceso por ID
 *     description: Obtiene un subproceso utilizando su ID único.
 *     tags: [Subprocesos]
 *     parameters:
 *       - in: path
 *         name: id_subproceso
 *         required: true
 *         description: El ID único del subproceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Subproceso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subproceso'
 *       404:
 *         description: Subproceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
subProcessRouter.get(
  '/:id_subproceso', 
  verifyToken, 
  verifyRole(['asistente', 'abogado']), 
  validatorHandler(getSubprocesoByIdSchema, 'params'), 
  obtenerSubproceso
);

/**
 * @swagger
 * /api/subprocesos/tipo/{id_tipo}:
 *   get:
 *     summary: Obtener subprocesos por tipo
 *     description: Obtiene una lista de subprocesos asociados a un tipo de proceso.
 *     tags: [Subprocesos]
 *     parameters:
 *       - in: path
 *         name: id_tipo
 *         required: true
 *         description: ID del tipo de proceso  
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Subprocesos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Subproceso'
 *       404:
 *         description: No se encontraron subprocesos para el tipo especificado
 *       500:
 *         description: Error interno en el servidor
 */
subProcessRouter.get(
  '/tipo/:id_tipo',
  verifyToken,
  verifyRole(['asistente']),
  obtenerSubprocesosPorTipo
);

/**
 * @swagger
 * /api/subprocesos/{id_subproceso}:
 *   delete:
 *     summary: Eliminar un subproceso
 *     description: Elimina un subproceso utilizando su ID único.
 *     tags: [Subprocesos]
 *     parameters:
 *       - in: path
 *         name: id_subproceso
 *         required: true
 *         description: El ID del subproceso a eliminar
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Subproceso eliminado correctamente
 *       404:
 *         description: Subproceso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
subProcessRouter.delete(
  '/:id_subproceso',
  verifyToken,
  verifyRole(['asistente']),
  validatorHandler(deleteSubprocesoSchema, 'params'),
  eliminarSubproceso
);

export default subProcessRouter;
