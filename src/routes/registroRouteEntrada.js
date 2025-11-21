import express from "express";
import * as registroControllerEntrada from "../controller/registroControllerEntrada.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroEntrada:
 *       type: object
 *       required:
 *         - id_vehiculo
 *         - entrada
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del registro
 *         id_vehiculo:
 *           type: integer
 *           description: ID del vehículo
 *         salida:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de salida
 *         entrada:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de entrada
 *         estado:
 *           type: boolean
 *           description: Estado del registro
 */

/**
 * @swagger
 * /api/registroEntrada:
 *   get:
 *     summary: Obtener todos los registros de entrada
 *     tags: [RegistroEntrada]
 *     responses:
 *       200:
 *         description: Lista de registros de entrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroEntrada'
 */
router.get("/registroEntrada", registroControllerEntrada.getRegistrosEntrada);

/**
 * @swagger
 * /api/registroEntrada:
 *   post:
 *     summary: Crear un nuevo registro de entrada
 *     tags: [RegistroEntrada]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroEntrada'
 *     responses:
 *       201:
 *         description: Registro de entrada creado
 */
router.post("/registroEntrada", registroControllerEntrada.postRegistroEntrada);

/**
 * @swagger
 * /api/registroEntrada/{id}:
 *   put:
 *     summary: Actualizar un registro de entrada existente
 *     tags: [RegistroEntrada]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroEntrada'
 *     responses:
 *       200:
 *         description: Registro actualizado
 */
router.put("/registroEntrada/:id", registroControllerEntrada.putRegistroEntrada);

/**
 * @swagger
 * /api/registroEntrada/{id}:
 *   delete:
 *     summary: Eliminar un registro de entrada
 *     tags: [RegistroEntrada]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado
 */
router.delete("/registroEntrada/:id", registroControllerEntrada.deleteRegistroEntrada);

/**
 * @swagger
 * /api/registroEntrada/search:
 *   get:
 *     summary: Buscar registros de entrada
 *     tags: [RegistroEntrada]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroEntrada'
 */
router.get("/registroEntrada/search", registroControllerEntrada.searchRegistroEntrada);

export default router;
