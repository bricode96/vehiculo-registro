import express, { Router } from "express";
import * as vehiculoController from "../controller/vehiculoController.js"

const router = express.Router();

router.get('/vehiculos', vehiculoController.getVehiculo);
router.post('/vehiculos', vehiculoController.postVehiculo);
router.put('/vehiculos/:id', vehiculoController.putVehiculo);
router.delete('/vehiculos/:id', vehiculoController.deleteVehiculo);

export default router;