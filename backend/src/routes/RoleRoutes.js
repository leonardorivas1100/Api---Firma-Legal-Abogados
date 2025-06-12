import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { rolValidation } from '../validators/RoleValidations.js';
import RoleController from '../controllers/RoleController.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js'; 

const roleRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Operaciones relacionadas con los roles.
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
 *     Role:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: number
 *           description: El ID del rol
 *         nombre:
 *           type: string
 *           description: El nombre del rol
 *       example:
 *         id: 1
 *         nombre: admin
 */

/**
 * @swagger
 * /api/rols:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol en el sistema.
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 *       400:
 *         description: Error de validación o datos incompletos.
 *       500:
 *         description: Error al crear el rol.
 */
roleRoutes.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(rolValidation), RoleController.createRole);

/**
 * @swagger
 * /api/rols/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     description: Actualiza un rol existente en el sistema.
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Indicar que esta ruta requiere autenticación con JWT
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *       400:
 *         description: Error de validación o datos incompletos.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al actualizar el rol.
 */
roleRoutes.put('/:id', verifyToken, verifyRole(['asistente']), validatorHandler(rolValidation), RoleController.updateRole);

/**
 * @swagger
 * /api/rols:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Obtiene una lista de todos los roles disponibles en el sistema.
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Lista de roles.
 *       500:
 *         description: Error al obtener los roles.
 */
roleRoutes.get('/', verifyToken, verifyRole(['asistente']), RoleController.getAllRoles);  // Obtener todos los roles

/**
 * @swagger
 * /api/rols/{id}:
 *   get:
 *     summary: Obtener un rol por su ID
 *     description: Obtiene los detalles de un rol utilizando su ID único.
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Rol encontrado.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al obtener el rol.
 */
roleRoutes.get('/:id', verifyToken, verifyRole(['asistente']), RoleController.getRoleById);  // Obtener rol por ID

/**
 * @swagger
 * /api/rols/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol del sistema utilizando su ID único.
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente.
 *       404:
 *         description: Rol no encontrado con ese ID.
 *       500:
 *         description: Error al eliminar el rol.
 */
roleRoutes.delete('/:id', verifyToken, verifyRole(['asistente']), RoleController.deleteRole);  // Eliminar rol por ID

export default roleRoutes;
