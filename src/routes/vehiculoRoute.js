import express, { Router } from "express";
import * as vehiculoController from "../controller/vehiculoController.js"

const router = express.Router();

router.get('/vehiculos', vehiculoController.getVehiculo);
router.post('/vehiculos', vehiculoController.postVehiculo);


export default router;