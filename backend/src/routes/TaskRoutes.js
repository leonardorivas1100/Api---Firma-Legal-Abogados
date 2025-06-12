import express from "express";
import {
  crearTarea,
  obtenerTodasTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
} from "../controllers/TaskController.js";
import {
  createTaskSchema,
  updateTaskSchema,
  getAllTasksSchema,
  getTaskByIdSchema,
  deleteTaskSchema,
} from "../validators/TaskValidation.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { verifyToken, verifyRole } from "../middleware/Autentication.js";

const taskRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Operaciones sobre las tareas/notas de los abogados
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
 *     Tarea:
 *       type: object
 *       properties:
 *         id_tarea:
 *           type: number
 *           description: ID único de la tarea
 *         titulo:
 *           type: string
 *           description: Título de la tarea
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la tarea
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la tarea
 *         hora_inicio:
 *           type: string
 *           format: date-time
 *           description: Hora de inicio de la tarea
 *         hora_fin:
 *           type: string
 *           format: date-time
 *           description: Hora de fin de la tarea
 *         estado:
 *           type: string
 *           enum: ['Pendiente', 'En progreso', 'Resultado', 'En revisión']
 *           description: Estado de la tarea
 *         todo_el_dia:
 *           type: boolean
 *           description: Indica si es una tarea de todo el día
 *         vincular_expediente:
 *           type: boolean
 *           description: Indica si se debe vincular a un expediente
 *         asociar_directorios:
 *           type: boolean
 *           description: Indica si se debe asociar a directorios
 *         asignado_a:
 *           type: string
 *           description: Persona asignada a la tarea
 *         id_proceso:
 *           type: number
 *           description: ID del proceso asociado (opcional)
 *         creado_por:
 *           type: string
 *           description: Usuario que creó la tarea
 *       required:
 *         - id_tarea
 *         - titulo
 *         - descripcion
 *         - fecha
 *         - hora_inicio
 *         - hora_fin
 *         - estado
 */

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea/nota para el abogado.
 *     tags: [Tareas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
taskRouter.post(
  "/" /*
    verifyToken,
    verifyRole(['asistente', 'abogado']),*/,
  validatorHandler(createTaskSchema),
  crearTarea
);

/**
 * @swagger
 * /api/tareas/{id_tarea}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Obtiene los detalles de una tarea mediante su ID.
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         description: ID numérico de la tarea
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
taskRouter.get(
  "/:id_tarea",
  /*verifyToken,
    verifyRole(['asistente', 'abogado']),*/
  validatorHandler(getTaskByIdSchema, "params"),
  obtenerTareaPorId
);

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene todas las tareas registradas con filtros opcionales.
 *     tags: [Tareas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: ['Pendiente', 'En progreso', 'Resultado', 'En revisión']
 *         description: Filtrar por estado de la tarea
 *       - in: query
 *         name: id_proceso
 *         schema:
 *           type: number
 *         description: Filtrar por ID de proceso asociado
 *       - in: query
 *         name: asignado_a
 *         schema:
 *           type: string
 *         description: Filtrar por persona asignada
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       500:
 *         description: Error interno en el servidor
 */
taskRouter.get(
  "/",
  /*verifyToken,*/
  validatorHandler(getAllTasksSchema),
  obtenerTodasTareas
);

/**
 * @swagger
 * /api/tareas/{id_tarea}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Permite editar los detalles de una tarea mediante su ID.
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         description: ID numérico de la tarea
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
taskRouter.put(
  "/:id_tarea",
  /*verifyToken,
    verifyRole(['asistente', 'abogado']),*/
  validatorHandler(updateTaskSchema),
  actualizarTarea
);

/**
 * @swagger
 * /api/tareas/{id_tarea}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     description: Elimina una tarea mediante su ID.
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id_tarea
 *         required: true
 *         description: ID numérico de la tarea
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
taskRouter.delete(
  "/:id_tarea",
  /*verifyToken,
    verifyRole(['asistente', 'abogado']),*/
  validatorHandler(deleteTaskSchema, "params"),
  eliminarTarea
);

export default taskRouter;
