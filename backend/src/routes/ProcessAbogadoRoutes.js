import express from "express";
import { crearProcesoAbogado, editarProcesoAbogado, getProcesoAbogado, getAllProcesoAbogados, eliminarProcesoAbogado } from "../controllers/ProcessAbogadoController.js";
import { createProcesoAbogadoSchema, updateProcesoAbogadoSchema, getProcesoAbogadoByIdSchema, getAllProcesoAbogadosSchema, deleteProcesoAbogadoSchema } from "../validators/ProcessAbogadoValidation.js";
import { validatorHandler } from '../middleware/validator.handler.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const procesoAbogadoRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProcesoAbogado
 *   description: Operaciones relacionadas con la relación entre procesos y abogados
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
 *     ProcesoAbogado:
 *       type: object
 *       required:
 *         - numeroIdentificacion
 *         - id_proceso
 *       properties:
 *         id_procesoabogado:
 *           type: number
 *           description: El ID del proceso-abogado
 *         numeroIdentificacion:
 *           type: number
 *           description: El número de identificación del abogado
 *         id_proceso:
 *           type: number
 *           description: El ID del proceso
 *       example:
 *         id_procesoabogado: 1
 *         numeroIdentificacion: 123456789
 *         id_proceso: 101
 */

/**
 * @swagger
 * /api/procesosabogados:
 *   post:
 *     summary: Crear un nuevo ProcesoAbogado
 *     description: Crea un nuevo ProcesoAbogado, asociando un proceso con un abogado.
 *     tags: [ProcesoAbogado]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcesoAbogado'
 *     responses:
 *       201:
 *         description: ProcesoAbogado creado exitosamente
 *       400:
 *         description: Error de validación o proceso ya existente
 *       500:
 *         description: Error interno del servidor
 */
procesoAbogadoRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createProcesoAbogadoSchema, 'body'), crearProcesoAbogado);


/**
 * @swagger
 * /api/procesosabogados/{id_procesoabogado}:
 *   get:
 *     summary: Obtener un ProcesoAbogado por ID
 *     description: Obtiene los detalles de un ProcesoAbogado mediante su ID, junto con los detalles del proceso asociado.
 *     tags: [ProcesoAbogado]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_procesoabogado
 *         required: true
 *         description: ID del ProcesoAbogado
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: ProcesoAbogado encontrado
 *       404:
 *         description: ProcesoAbogado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
procesoAbogadoRouter.get('/:id_procesoabogado', verifyToken, verifyRole(['asistente']), validatorHandler(getProcesoAbogadoByIdSchema, 'params'), getProcesoAbogado);


/**
 * @swagger
 * /api/procesosabogados:
 *   get:
 *     summary: Obtener todos los ProcesoAbogado
 *     description: Obtiene una lista de todos los ProcesoAbogado con filtros opcionales.
 *     tags: [ProcesoAbogado]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_proceso
 *         required: false
 *         description: Filtro por ID de Proceso
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de ProcesoAbogado encontrada
 *       500:
 *         description: Error interno del servidor
 */
procesoAbogadoRouter.get('/', verifyToken, verifyRole(['asistente']), validatorHandler(getAllProcesoAbogadosSchema, 'query'), getAllProcesoAbogados);


/**
 * @swagger
 * /api/procesosabogados/{id_procesoabogado}:
 *   put:
 *     summary: Editar un ProcesoAbogado
 *     description: Permite editar los detalles de un ProcesoAbogado mediante su ID.
 *     tags: [ProcesoAbogado]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_procesoabogado
 *         required: true
 *         description: ID del ProcesoAbogado
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcesoAbogado'
 *     responses:
 *       200:
 *         description: ProcesoAbogado actualizado con éxito
 *       404:
 *         description: ProcesoAbogado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
procesoAbogadoRouter.put('/:id_procesoabogado', verifyToken, verifyRole(['asistente']), validatorHandler(updateProcesoAbogadoSchema, 'body'), editarProcesoAbogado);

/**
 * @swagger
 * /api/procesosabogados/{id_procesoabogado}:
 *   delete:
 *     summary: Eliminar un ProcesoAbogado
 *     description: Elimina un ProcesoAbogado mediante su ID.
 *     tags: [ProcesoAbogado]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_procesoabogado
 *         required: true
 *         description: ID del ProcesoAbogado
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: ProcesoAbogado eliminado con éxito
 *       404:
 *         description: ProcesoAbogado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
procesoAbogadoRouter.delete('/:id_procesoabogado', verifyToken, verifyRole(['asistente']), validatorHandler(deleteProcesoAbogadoSchema, 'params'), eliminarProcesoAbogado);

export default procesoAbogadoRouter;
