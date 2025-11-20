import express, { Router } from "express";
import * as registroControllerEntrada from "../controller/registroControllerEntrada.js"

const router = express.Router();

router.get('/registroEntrada', registroControllerEntrada.getRegistrosEntrada);
router.post('/registroEntrada', registroControllerEntrada.postRegistroEntrada);
router.put('/registroEntrada/:id', registroControllerEntrada.putRegistroEntrada);
router.delete('/registroEntrada/:id', registroControllerEntrada.deleteRegistroEntrada);
router.get('/registroEntrada/search', registroControllerEntrada.searchRegistroEntrada);


export default router;