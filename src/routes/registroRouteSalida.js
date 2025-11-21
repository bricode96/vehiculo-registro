import express from "express";
import * as registroControllerSalida from "../controller/registroControllerSalida.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroSalida:
 *       type: object
 *       required:
 *         - id_vehiculo
 *         - salida
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
 * /api/registroSalida:
 *   get:
 *     summary: Obtener todos los registros de salida
 *     tags: [RegistroSalida]
 *     responses:
 *       200:
 *         description: Lista de registros de salida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroSalida'
 */
router.get("/registroSalida", registroControllerSalida.getRegistroSalida);

/**
 * @swagger
 * /api/registroSalida:
 *   post:
 *     summary: Crear un nuevo registro de salida
 *     tags: [RegistroSalida]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroSalida'
 *     responses:
 *       201:
 *         description: Registro de salida creado
 */
router.post("/registroSalida", registroControllerSalida.postRegistroSalida);

/**
 * @swagger
 * /api/registroSalida/{id}:
 *   put:
 *     summary: Actualizar un registro de salida existente
 *     tags: [RegistroSalida]
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
 *             $ref: '#/components/schemas/RegistroSalida'
 *     responses:
 *       200:
 *         description: Registro actualizado
 */
router.put("/registroSalida/:id", registroControllerSalida.putRegistroSalida);

/**
 * @swagger
 * /api/registroSalida/{id}:
 *   delete:
 *     summary: Eliminar un registro de salida
 *     tags: [RegistroSalida]
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
router.delete("/registroSalida/:id", registroControllerSalida.deleteRegistroSalida);

/**
 * @swagger
 * /api/registroSalida/search:
 *   get:
 *     summary: Buscar registros de salida
 *     tags: [RegistroSalida]
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
 *                 $ref: '#/components/schemas/RegistroSalida'
 */
router.get("/registroSalida/search", registroControllerSalida.searchRegistroSalida);

export default router;
