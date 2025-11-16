import express, { Router } from "express";
import * as vehiculoController from "../controller/vehiculoController.js"

const router = express.Router();

router.get('/vehiculos', vehiculoController.getVehiculo);



export default router;