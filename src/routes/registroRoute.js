import express, { Router } from "express";
import * as registroController from "../controller/registroController.js"

const router = express.Router();

router.get('/registro', registroController.getRegistro);


export default router;