import express from "express";
import {
  crearAgenda,
  getAgenda,
  getAllAgendas,
  editarAgenda,
  eliminarAgenda,
  getAgendasByIdentificacionAbogado,
} from "../controllers/AgendaController.js";
import {
  createAgendaSchema,
  updateAgendaSchema,
  getAgendaByIdSchema,
  deleteAgendaSchema,
} from "../validators/AgendaValidation.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { verifyToken, verifyRole } from "../middleware/Autentication.js";

const agendaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agenda
 *   description: Operaciones sobre las agendas
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
 *     Agenda:
 *       type: object
 *       properties:
 *         id_proceso:
 *           type: string
 *           description: ID del proceso asociado a la agenda
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la agenda
 *         hora_inicio:
 *           type: string
 *           format: date-time
 *           description: Hora de inicio de la agenda
 *         hora_fin:
 *           type: string
 *           format: date-time
 *           description: Hora de fin de la agenda
 *         descripcion:
 *           type: string
 *           description: Descripción o motivo de la agenda
 *         id_usuario:
 *           type: string
 *           description: ID del usuario relacionado con la agenda
 *         estado:
 *           type: string
 *           description: Estado de la agenda (por ejemplo, 'confirmada', 'pendiente', etc.)
 *         creado_en:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en la que se creó la agenda
 *       required:
 *         - id_proceso
 *         - fecha
 *         - hora_inicio
 *         - hora_fin
 *         - descripcion
 *         - id_usuario
 *         - estado
 *         - creado_en
 */

/**
 * @swagger
 * /api/agendas:
 *   post:
 *     summary: Crear una nueva agenda
 *     description: Crea una nueva agenda asociada a un proceso.
 *     tags: [Agenda]
 *     security:
 *       - BearerAuth: []  # Se requiere un token JWT para esta operación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agenda'
 *     responses:
 *       201:
 *         description: Agenda creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
agendaRouter.post(
  "/",
  /*verifyToken, verifyRole(['asistente']),*/ validatorHandler(
    createAgendaSchema
  ),
  crearAgenda
);

agendaRouter.get(
  "/abogado/:numeroIdentificacionAbogado",
  getAgendasByIdentificacionAbogado
);

/**
 * @swagger
 * /api/agendas/{id_agenda}:
 *   get:
 *     summary: Obtener una agenda por ID
 *     description: Obtiene los detalles de una agenda mediante su ID.
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: id_agenda
 *         required: true
 *         description: ID de la agenda
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Requiere autenticación
 *     responses:
 *       200:
 *         description: Agenda encontrada
 *       404:
 *         description: Agenda no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
agendaRouter.get(
  "/:id_agenda",
  /*
  verifyToken,
  verifyRole(["asistente", "abogado"]),*/
  validatorHandler(getAgendaByIdSchema, "params"),
  getAgenda
);

/**
 * @swagger
 * /api/agendas:
 *   get:
 *     summary: Obtener todas las agendas
 *     description: Obtiene todas las agendas registradas con filtros opcionales.
 *     tags: [Agenda]
 *     security:
 *       - BearerAuth: []  # Se requiere autenticación
 *     responses:
 *       200:
 *         description: Agendas encontradas
 *       500:
 *         description: Error interno en el servidor
 */
agendaRouter.get(
  "/",
  /*verifyToken, verifyRole(['asistente', 'abogado']),*/
  getAllAgendas
);

/**
 * @swagger
 * /api/agendas/{id_agenda}:
 *   put:
 *     summary: Editar una agenda
 *     description: Permite editar los detalles de una agenda mediante su ID.
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: id_agenda
 *         required: true
 *         description: ID de la agenda
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agenda'
 *     responses:
 *       200:
 *         description: Agenda actualizada exitosamente
 *       404:
 *         description: Agenda no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
agendaRouter.put(
  "/:id_agenda",
  /*
  verifyToken,
  verifyRole(["asistente"]),*/
  validatorHandler(updateAgendaSchema),
  editarAgenda
);

/**
 * @swagger
 * /api/agendas/{id_agenda}:
 *   delete:
 *     summary: Eliminar una agenda por ID
 *     description: Elimina una agenda mediante su ID.
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: id_agenda
 *         required: true
 *         description: ID de la agenda
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Requiere autenticación
 *     responses:
 *       200:
 *         description: Agenda eliminada con éxito
 *       404:
 *         description: Agenda no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
agendaRouter.delete(
  "/:id_agenda" /*
  verifyToken,
  verifyRole(["asistente"]),*/,
  validatorHandler(deleteAgendaSchema, "params"),
  eliminarAgenda
);

export default agendaRouter;
