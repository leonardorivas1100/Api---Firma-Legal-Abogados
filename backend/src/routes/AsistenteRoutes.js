import express from 'express';
import { createAsistente, getAsistente, updateAsistente } from '../controllers/AsistenteController.js';
import { createAsistenteSchema, updateAsistenteSchema, getAsistenteSchema } from '../validators/AsistenteValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js';  // Importar los middlewares de autenticación

const AsistenteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Asistentes
 *   description: Operaciones sobre los asistentes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Asistente:
 *       type: object
 *       properties:
 *         numeroIdentificacion:
 *           type: string
 *           description: Número de identificación único del asistente
 *         nombres:
 *           type: string
 *           description: Nombres del asistente
 *         apellidos:
 *           type: string
 *           description: Apellidos del asistente
 *         telefono:
 *           type: string
 *           description: Teléfono del asistente
 *         email:
 *           type: string
 *           description: Correo electrónico del asistente
 *         id_rol:
 *           type: integer
 *           description: ID del rol asociado (ej. 2 = Asistente)
 *       required:
 *         - numeroIdentificacion
 *         - nombres
 *         - apellidos
 *         - telefono
 *         - email
 *         - id_rol
 */

/**
 * @swagger
 * /api/asistentes:
 *   post:
 *     summary: Crear un nuevo asistente
 *     description: Crea un nuevo asistente y lo asocia a un usuario por su número de identificación.
 *     tags: [Asistentes]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *     responses:
 *       201:
 *         description: Asistente creado exitosamente
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *       400:
 *         description: El usuario ya está registrado como asistente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createAsistenteSchema, 'body'), createAsistente);

/**
 * @swagger
 * /api/asistentes/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un asistente por número de identificación
 *     description: Obtiene los detalles de un asistente mediante su número de identificación.
 *     tags: [Asistentes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del asistente
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Asistente encontrado
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.get('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), validatorHandler(getAsistenteSchema, 'params'), getAsistente);

/**
 * @swagger
 * /api/asistentes/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un asistente
 *     description: Actualiza los detalles de un asistente. Solo se pueden modificar los campos proporcionados.
 *     tags: [Asistentes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del asistente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Asistente actualizado exitosamente
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
AsistenteRouter.put('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), validatorHandler(updateAsistenteSchema, 'body'), updateAsistente);

export default AsistenteRouter;
