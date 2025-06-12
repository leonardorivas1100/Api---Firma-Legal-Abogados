import express from 'express';
import { crearCliente, getCliente, updateCliente, getClientes } from '../controllers/ClienteController.js';
import { createClienteSchema, updateClienteSchema, getClienteSchema, getClientesSchema } from '../validators/ClienteValidation.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js';  // Importar los middlewares de autenticación

const ClienteRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones sobre los clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         numeroIdentificacion:
 *           type: string
 *           description: Número de identificación único del cliente
 *         nombres:
 *           type: string
 *           description: Nombres del cliente
 *         apellidos:
 *           type: string
 *           description: Apellidos del cliente
 *         telefono:
 *           type: string
 *           description: Teléfono del cliente
 *         email:
 *           type: string
 *           description: Correo electrónico del cliente
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *       required:
 *         - numeroIdentificacion
 *         - nombres
 *         - apellidos
 *         - telefono
 *         - email
 *         - direccion
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente y lo asocia a un usuario por su número de identificación.
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error de validación o datos incompletos
 *       404:
 *         description: Usuario no encontrado para asociar el cliente
 *       500:
 *         description: Error interno al crear el cliente
 */
ClienteRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createClienteSchema, 'body'), crearCliente);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Obtiene la lista de todos los clientes registrados en la base de datos.
 *     tags: [Clientes]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       404:
 *         description: No se encontraron clientes
 *       500:
 *         description: Error interno al obtener los clientes
 */
ClienteRouter.get('/', verifyToken, verifyRole(['asistente']), validatorHandler(getClientesSchema, 'query'), getClientes); 

/**
 * @swagger
 * /api/clientes/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un cliente por número de identificación
 *     description: Obtiene los detalles de un cliente mediante su número de identificación.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del cliente
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno al obtener el cliente
 */
ClienteRouter.get('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), validatorHandler(getClienteSchema, 'params'), getCliente);

/**
 * @swagger
 * /api/clientes/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los detalles de un cliente. Solo se pueden modificar los campos proporcionados.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: numeroIdentificacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de identificación del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error de validación o datos incompletos
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno al actualizar el cliente
 */
ClienteRouter.put('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), validatorHandler(updateClienteSchema, 'body'), updateCliente);

export default ClienteRouter;
