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
 *         - id_vehiculo_fk
 *         - nombre_motorista
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del registro de salida
 *         id_vehiculo_fk:
 *           type: integer
 *           description: ID del vehículo
 *         nombre_motorista:
 *           type: string
 *           description: Nombre del motorista
 *         fecha_salida:
 *           type: string
 *           format: date
 *           description: Fecha de salida
 *         hora_salida:
 *           type: string
 *           format: time
 *           description: Hora de salida
 *         kilometraje_salida:
 *           type: integer
 *           description: Kilometraje al salir
 *         status:
 *           type: boolean
 *           description: Estado del registro
 *         modelo:
 *           type: string
 *           description: Modelo del vehículo
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
 *     summary: Buscar registros de salida por motorista, marca, modelo o placa
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
