import express from "express";
import {
  crearAbogado,
  getAbogado,
  updateAbogado,
} from "../controllers/AbogadoController.js";
import {
  createAbogadoSchema,
  updateAbogadoSchema,
  getAbogadoSchema,
} from "../validators/AbogadoValidation.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { verifyToken, verifyRole } from "../middleware/Autentication.js";

const Abogadorouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Abogados
 *   description: Operaciones sobre los abogados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Abogado:
 *       type: object
 *       properties:
 *         numeroIdentificacion:
 *           type: string
 *           description: Número de identificación del abogado.
 *         nombres:
 *           type: string
 *           description: Nombres del abogado.
 *         apellidos:
 *           type: string
 *           description: Apellidos del abogado.
 *         correo:
 *           type: string
 *           description: Correo electrónico del abogado.
 *         telefono:
 *           type: string
 *           description: Teléfono del abogado.
 *         direccion:
 *           type: string
 *           description: Dirección del abogado.
 *         id_rol:
 *           type: string
 *           description: El rol del abogado. Este valor debería ser uno de los valores válidos como 'abogado', 'asistente', etc.
 *           example: 'abogado'
 *         id_user:
 *           type: string
 *           description: ID del usuario asociado al abogado.
 *           example: '60d21b4667d0d8992e610c85'
 *       required:
 *         - numeroIdentificacion
 *         - nombres
 *         - apellidos
 *         - correo
 *         - telefono
 *         - direccion
 *         - id_rol
 *         - id_user
 */

/**
 * @swagger
 * /api/abogados:
 *   post:
 *     summary: Crear un nuevo abogado
 *     description: Crea un nuevo abogado y lo asocia a un usuario por su número de identificación.
 *     tags: [Abogados]
 *     security:
 *       - BearerAuth: []  # Especifica que se requiere un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Abogado'  # Referencia al esquema 'Abogado'
 *     responses:
 *       201:
 *         description: Abogado creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.post(
  "/",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(createAbogadoSchema),
  crearAbogado
);

/**
 * @swagger
 * /api/abogados/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un abogado por número de identificación
 *     description: Obtiene los detalles de un abogado mediante su número de identificación.
 *     tags: [Abogados]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         description: Número de identificación del abogado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Abogado encontrado
 *       404:
 *         description: Abogado no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.get(
  "/:numeroIdentificacion",
  /*verifyToken, verifyRole(['asistente']),*/ validatorHandler(
    getAbogadoSchema
  ),
  getAbogado
);

/**
 * @swagger
 * /api/abogados/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar los detalles de un abogado
 *     description: Actualiza los detalles de un abogado utilizando su número de identificación. Los campos que no se incluyan en la solicitud no se modificarán.
 *     tags: [Abogados]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         description: Número de identificación del abogado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Abogado'  # Referencia al esquema 'Abogado'
 *     responses:
 *       200:
 *         description: Abogado actualizado exitosamente
 *       400:
 *         description: Error de validación, los datos enviados no son correctos
 *       404:
 *         description: Abogado no encontrado con el número de identificación proporcionado
 *       500:
 *         description: Error interno en el servidor
 */
Abogadorouter.put(
  "/:numeroIdentificacion",
  verifyToken,
  verifyRole(["asistente"]),
  validatorHandler(updateAbogadoSchema),
  updateAbogado
);

export default Abogadorouter;
