import express from 'express';
import { 
  crearDocEsp, 
  obtenerDocEsp, 
  obtenerDocEspId,
  obtenerDocEspPorSubproceso, 
  eliminarDocEsp 
} from '../controllers/DocEspController.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { 
  createDocEspSchema, 
  getDocEspByIdSchema, 
  deleteDocEspSchema 
} from '../validators/DocEspValidation.js';
import { verifyToken, verifyRole } from '../middleware/Autentication.js';

const DocEspRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: DocEsp
 *   description: Operaciones relacionadas con documentos específicos
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
 *     DocEsp:
 *       type: object
 *       properties:
 *         id_DocEsp:
 *           type: number
 *           description: ID único para el Documento Específico
 *         id_subproceso:
 *           type: number
 *           description: ID del subproceso asociado
 *         nombre:
 *           type: string
 *           description: Nombre del Documento Específico
 *       required:
 *         - id_DocEsp
 *         - id_subproceso
 *         - nombre
 */

/**
 * @swagger
 * /api/DocEsp:
 *   post:
 *     summary: Crear un nuevo Documento Específico
 *     tags: [DocEsp]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocEsp'
 *     responses:
 *       201:
 *         description: Documento Específico creado exitosamente
 *       400:
 *         description: El Documento Específico ya existe o el Subproceso no existe
 *       500:
 *         description: Error al crear el Documento Específico
 */
DocEspRouter.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createDocEspSchema, 'body'), crearDocEsp);

/**
 * @swagger
 * /api/DocEsp:
 *   get:
 *     summary: Obtener todos los Documentos Específicos
 *     tags: [DocEsp]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Documentos Específicos
 *       500:
 *         description: Error al obtener los Documentos Específicos
 */
DocEspRouter.get('/', verifyToken, verifyRole(['asistente', 'abogado']), obtenerDocEsp);

/**
 * @swagger
 * /api/DocEsp/{id_DocEsp}:
 *   get:
 *     summary: Obtener un Documento Específico por su ID
 *     tags: [DocEsp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_DocEsp
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Documento Específico
 *     responses:
 *       200:
 *         description: Documento Específico encontrado
 *       404:
 *         description: Documento Específico no encontrado
 *       500:
 *         description: Error al obtener el Documento Específico
 */
DocEspRouter.get('/:id_DocEsp', verifyToken, verifyRole(['asistente', 'abogado']), validatorHandler(getDocEspByIdSchema, 'params'), obtenerDocEspId);

/**
 * @swagger
 * /api/DocEsp/subproceso/{id_subproceso}:
 *   get:
 *     summary: Obtener Documentos Específicos por Subproceso
 *     tags: [DocEsp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_subproceso
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Subproceso
 *     responses:
 *       200:
 *         description: Documentos Específicos encontrados por Subproceso
 *       404:
 *         description: Subproceso no encontrado
 *       500:
 *         description: Error al obtener los Documentos Específicos por Subproceso
 * */
DocEspRouter.get('/subproceso/:id_subproceso', verifyToken, verifyRole(['asistente']), obtenerDocEspPorSubproceso);

/**
 * @swagger
 * /api/DocEsp/{id_DocEsp}:
 *   delete:
 *     summary: Eliminar un Documento Específico por su ID
 *     tags: [DocEsp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_DocEsp
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del Documento Específico
 *     responses:
 *       200:
 *         description: Documento Específico eliminado correctamente
 *       404:
 *         description: Documento Específico no encontrado
 *       500:
 *         description: Error al eliminar el Documento Específico
 */
DocEspRouter.delete('/:id_DocEsp', verifyToken, verifyRole(['asistente']), validatorHandler(deleteDocEspSchema, 'params'), eliminarDocEsp);

export default DocEspRouter;
