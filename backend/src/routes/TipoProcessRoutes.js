import express from 'express';
import { obtenerTodosTipoProcess, obtenerTipoProcessPorId, crearTipoProcess, eliminarTipoProcess } from '../controllers/TipoProcessController.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createTipoProcessSchema, getTipoProcessByIdSchema, deleteTipoProcessSchema } from '../validators/TipoProcessValidation.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const tipoProcessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipo de Proceso
 *   description: Operaciones relacionadas con los tipos de proceso (Notariales, Juzgados, Curadurías, etc.).
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
 *     TipoProcess:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id_tipo:
 *           type: number
 *           description: El ID del tipo de proceso
 *         nombre:
 *           type: string
 *           description: El nombre del tipo de proceso (Notarial, Judicial, etc.)
 *       example:
 *         id_tipo: 1
 *         nombre: Notarial
 */

/**
 * @swagger
 * /api/tipoprocesos:
 *   post:
 *     summary: Crear un nuevo tipo de proceso
 *     description: Crea un nuevo tipo de proceso (Notariales, Juzgados o Curadurías).
 *     tags: [Tipo de Proceso]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProcess'
 *     responses:
 *       201:
 *         description: Tipo de proceso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
tipoProcessRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createTipoProcessSchema), crearTipoProcess);


/**
 * @swagger
 * /api/tipoprocesos:
 *   get:
 *     summary: Obtener todos los tipos de proceso
 *     description: Obtiene todos los tipos de proceso almacenados en la base de datos.
 *     tags: [Tipo de Proceso]
 *     security:
 *       - BearerAuth: []  # Ruta protegida, requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Lista de tipos de proceso
 *       500:
 *         description: Error interno en el servidor
 */
tipoProcessRouter.get('/', verifyToken, verifyRole(['asistente', 'abogado']), obtenerTodosTipoProcess);  // No aplica validación aquí, ya que no se necesitan parámetros


/**
 * @swagger
 * /api/tipoprocesos/{id_tipo}:
 *   get:
 *     summary: Obtener un tipo de proceso por ID
 *     description: Obtiene los detalles de un tipo de proceso mediante su ID.
 *     tags: [Tipo de Proceso]
 *     parameters:
 *       - in: path
 *         name: id_tipo
 *         required: true
 *         description: ID del tipo de proceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Tipo de proceso encontrado
 *       404:
 *         description: Tipo de proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
tipoProcessRouter.get('/:id_tipo', verifyToken, verifyRole(['asistente', 'abogado']), validatorHandler(getTipoProcessByIdSchema, 'params'), obtenerTipoProcessPorId);


/**
 * @swagger
 * /api/tipoprocesos/{id_tipo}:
 *   delete:
 *     summary: Eliminar un tipo de proceso por ID
 *     description: Elimina un tipo de proceso mediante su ID.
 *     tags: [Tipo de Proceso]
 *     parameters:
 *       - in: path
 *         name: id_tipo
 *         required: true
 *         description: ID del tipo de proceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Tipo de proceso eliminado con éxito
 *       404:
 *         description: Tipo de proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
tipoProcessRouter.delete('/:id_tipo', verifyToken, verifyRole(['asistente']), validatorHandler(deleteTipoProcessSchema, 'params'), eliminarTipoProcess);

export default tipoProcessRouter;
