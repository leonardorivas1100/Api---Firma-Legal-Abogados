import express from 'express';
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/UsersController.js';  // Controladores de usuarios
import { 
  createUserSchema, 
  updateUserSchema 
} from '../validators/UsersValidation.js';  // Validaciones de usuarios
import { validatorHandler } from '../middleware/validator.handler.js';  // Middleware de validación
import { verifyToken, verifyRole } from '../middleware/Autentication.js';  // Middleware de autenticación y autorización

const usersRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
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
 *     Usuario:
 *       type: object
 *       properties:
 *         numeroIdentificacion:
 *           type: string
 *           description: Número de identificación del usuario.
 *         nombres:
 *           type: string
 *           description: Nombres del usuario.
 *         apellidos:
 *           type: string
 *           description: Apellidos del usuario.
 *         telefono:
 *           type: string
 *           description: Teléfono del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         rol:
 *           type: string
 *           description: El rol del usuario (por ejemplo, 'admin', 'usuario').
 *       required:
 *         - numeroIdentificacion
 *         - nombres
 *         - apellidos
 *         - telefono
 *         - email
 *         - password
 *         - rol
 */

/**
 * @swagger
 * /api/usuarios/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'  # Referencia al esquema 'Usuario'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Correo o teléfono ya registrados
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.post('/create', 
  verifyToken, 
  verifyRole(['asistente']), 
  validatorHandler(createUserSchema, 'body'), 
  createUser
);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.get('/', 
   
  getAllUsers
);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un usuario por número de identificación
 *     description: Obtiene un usuario específico mediante su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.get('/:numeroIdentificacion', 
  verifyToken, 
  verifyRole(['asistente', 'cliente']), 
  getUserById
);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un usuario por número de identificación
 *     description: Actualiza los detalles de un usuario existente mediante su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *             required:
 *               - nombres
 *               - apellidos
 *               - telefono
 *               - email
 *               - password
 *               - rol
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.put('/:numeroIdentificacion', 
 
  validatorHandler(updateUserSchema, 'body'), 
  updateUser
);

/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   delete:
 *     summary: Eliminar un usuario por número de identificación
 *     description: Elimina un usuario de la base de datos utilizando su número de identificación.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
usersRoutes.delete('/:numeroIdentificacion', 
  verifyToken, 
  verifyRole(['asistente']), 
  deleteUser
);

export default usersRoutes;
