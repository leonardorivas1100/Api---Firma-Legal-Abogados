import express from "express";
import {
  crearFactura,
  getFactura,
  editarFactura,
  getAllFacturas,
  eliminarFactura,
} from "../controllers/FacturaController.js";
import {
  createFacturaSchema,
  updateFacturaSchema,
  getAllFacturasSchema,
  getFacturaByIdSchema,
  deletefacturaSchema,
} from "../validators/FacturaValidation.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { verifyToken, verifyRole } from "../middleware/Autentication.js"; // Importar middlewares de autenticación

const facturaRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Factura
 *   description: Operaciones relacionadas con las facturas
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
 *     Factura:
 *       type: object
 *       properties:
 *         id_factura:
 *           type: number
 *           description: ID único de la factura
 *         id_proceso:
 *           type: number
 *           description: ID del proceso asociado a la factura
 *         descripcion:
 *           type: string
 *           description: Descripción del concepto de la factura
 *         monto:
 *           type: number
 *           description: Monto total de la factura
 *         fecha_emision:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la factura
 *       required:
 *         - id_factura
 *         - id_proceso
 *         - descripcion
 *         - monto
 *         - fecha_emision
 */

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     description: Crea una nueva factura asociada a un proceso.
 *     tags: [Factura]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
facturaRouter.post(
  "/",
  /*
  verifyToken,
  verifyRole(["asistente"]),
  */
  validatorHandler(createFacturaSchema, "body"),
  crearFactura
);

/**
 * @swagger
 * /api/facturas/{id_factura}:
 *   get:
 *     summary: Obtener una factura por ID
 *     description: Obtiene los detalles de una factura mediante su ID.
 *     tags: [Factura]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     parameters:
 *       - in: path
 *         name: id_factura
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
facturaRouter.get(
  "/:id_factura",
  /*verifyToken, verifyRole(['abogado', 'asistente']),*/ validatorHandler(
    getFacturaByIdSchema,
    "params"
  ),
  getFactura
);

/**
 * @swagger
 * /api/facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     description: Obtiene todas las facturas registradas con filtros opcionales.
 *     tags: [Factura]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Facturas encontradas
 *       500:
 *         description: Error interno en el servidor
 */
facturaRouter.get(
  "/",
  /*verifyToken, verifyRole(['asistente']),*/ validatorHandler(
    getAllFacturasSchema,
    "query"
  ),
  getAllFacturas
);

/**
 * @swagger
 * /api/facturas/{id_factura}:
 *   put:
 *     summary: Editar una factura
 *     description: Permite editar los detalles de una factura mediante su ID.
 *     tags: [Factura]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     parameters:
 *       - in: path
 *         name: id_factura
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
facturaRouter.put(
  "/:id_factura",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(updateFacturaSchema, "body"),
  editarFactura
);

/**
 * @swagger
 * /api/facturas/{id_factura}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     description: Elimina una factura mediante su ID.
 *     tags: [Factura]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: id_factura
 *         required: true
 *         description: ID de la factura
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Factura eliminada con éxito
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error interno en el servidor
 */
facturaRouter.delete(
  "/:id_factura",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(deletefacturaSchema, "params"),
  eliminarFactura
);

export default facturaRouter;
