import express from "express";
import {
  crearProceso,
  get_process_id,
  getAllProcesos,
  eliminarProceso,
  actualizarProceso,
  // get_especify_process,
  get_process_by_abogado,
} from "../controllers/ProcessController.js";
import {
  createProcesoSchema,
  getAllProcesosSchema,
  getProcesoByIdSchema,
  deleteProcesoSchema,
} from "../validators/ProcessValidation.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { verifyToken, verifyRole } from "../middleware/Autentication.js";

const ProcessRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Procesos
 *   description: Operaciones sobre los procesos
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
 *     Proceso:
 *       type: object
 *       required:
 *         - clienteId
 *         - abogadoId
 *       properties:
 *         id_proceso:
 *           type: number
 *           description: ID del proceso
 *         clienteId:
 *           type: number
 *           description: Número de identificación del cliente
 *         abogadoId:
 *           type: number
 *           description: Número de identificación del abogado
 *       example:
 *         id_proceso: 1
 *         clienteId: 12345
 *         abogadoId: 67890
 */

/**
 * @swagger
 * /api/procesos:
 *   post:
 *     summary: Crear un nuevo proceso
 *     description: Crea un nuevo proceso asociando un cliente y un abogado mediante sus números de identificación.
 *     tags: [Procesos]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proceso'
 *     responses:
 *       201:
 *         description: Proceso creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.post(
  "/",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(createProcesoSchema, "body"),
  crearProceso
);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   get:
 *     summary: Obtener un proceso por ID
 *     description: Obtiene los detalles de un proceso mediante su ID.
 *     tags: [Procesos]
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Proceso encontrado
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
// ProcessRouter.get('/:id_proceso', verifyToken, verifyRole(['asistente', 'abogado']), validatorHandler(getProcesoByIdSchema, 'params'), get_process_id);

/**
 * @swagger
 * /api/procesos:
 *   get:
 *     summary: Obtener todos los procesos
 *     description: Obtiene todos los procesos registrados.
 *     tags: [Procesos]
 *     security:
 *       - BearerAuth: []  # Ruta protegida, requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Procesos encontrados
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.get(
  "/",
  /*verifyToken, verifyRole(['asistente', 'abogado', 'cliente']),*/ validatorHandler(
    getAllProcesosSchema,
    "query"
  ),
  getAllProcesos
);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   put:
 *     summary: Actualizar un proceso por ID
 *     description: Permite actualizar los detalles de un proceso mediante su ID.
 *     tags: [Procesos]
 *     security:
 *       - BearerAuth: []  # Ruta protegida, requiere autenticación con JWT
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso a actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proceso'
 *     responses:
 *       200:
 *         description: Proceso actualizado con éxito
 *       404:
 *         description: Proceso no encontrado
 *       400:
 *         description: Error de validación o datos incorrectos
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.put("/:id_proceso", actualizarProceso);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   delete:
 *     summary: Eliminar un proceso por ID
 *     description: Elimina un proceso mediante su ID.
 *     tags: [Procesos]
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Ruta protegida, requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Proceso eliminado con éxito
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
ProcessRouter.delete(
  "/:id_proceso",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(deleteProcesoSchema, "params"),
  eliminarProceso
);

// /**
//  * @swagger
//  * /api/procesos/{numeroIdentificacionCliente}:
//  *   get:
//  *     summary: Buscar un proceso por el numero de identificacion de su cliente
//  *     description: Buscar el proceso asociado a un cliente en especifico
//  *     tags: [Procesos]
//  *     parameters:
//  *       - in: path
//  *         name: numeroIdentificacionCliente
//  *         required: true
//  *         description: Numero identificacion del cliente
//  *         schema:
//  *           type: number
//  *     security:
//  *       - BearerAuth: []  # Ruta protegida, requiere autenticación con JWT
//  *     responses:
//  *       200:
//  *         description: Proceso eliminado con éxito
//  *       404:
//  *         description: Proceso no encontrado
//  *       500:
//  *         description: Error interno en el servidor
//  */
// ProcessRouter.get("/:numeroIdentificacionCliente", get_especify_process);

/**
 * @swagger
 * /api/procesos/{id_proceso}:
 *   get:
 *     summary: Obtener un proceso por ID
 *     description: Obtiene los detalles de un proceso mediante su ID.
 *     tags: [Procesos]
 *     parameters:
 *       - in: path
 *         name: id_proceso
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Proceso encontrado
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
// ProcessRouter.get('/:id_proceso', /*verifyToken, verifyRole(['asistente', 'abogado']),*/ validatorHandler(getProcesoByIdSchema, 'params'), get_process_id);
ProcessRouter.get(
  "/:id_proceso",
  validatorHandler(getProcesoByIdSchema, "params"),
  get_process_id
);

// Agregar esta ruta
ProcessRouter.get(
  "/abogado/:numeroIdentificacionAbogado",
  get_process_by_abogado
);

export default ProcessRouter;
