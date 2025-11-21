import express from "express";
import * as vehiculoController from "../controller/vehiculoController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehiculo:
 *       type: object
 *       required:
 *         - marca
 *         - modelo
 *         - placa
 *       properties:
 *         id:
 *           type: integer
 *         marca:
 *           type: string
 *         modelo:
 *           type: string
 *         placa:
 *           type: string
 *         status:
 *           type: boolean
 */

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     summary: Obtener todos los vehículos
 *     tags: [Vehiculos]
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehiculo'
 */
router.get("/vehiculos", vehiculoController.getVehiculo);

/**
 * @swagger
 * /api/vehiculos:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     tags: [Vehiculos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       201:
 *         description: Vehículo creado
 */
router.post("/vehiculos", vehiculoController.postVehiculo);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   put:
 *     summary: Actualizar un vehículo existente
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehiculo'
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 */
router.put("/vehiculos/:id", vehiculoController.putVehiculo);

/**
 * @swagger
 * /api/vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     tags: [Vehiculos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 */
router.delete("/vehiculos/:id", vehiculoController.deleteVehiculo);

/**
 * @swagger
 * /api/vehiculos/search:
 *   get:
 *     summary: Buscar vehículos por marca, modelo o placa
 *     tags: [Vehiculos]
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
 *                 $ref: '#/components/schemas/Vehiculo'
 */
router.get("/vehiculos/search", vehiculoController.searchVehiculo);

export default router;