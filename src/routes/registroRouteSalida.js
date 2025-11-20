import express, { Router } from "express";
import * as registroControllerSalida from "../controller/registroControllerSalida.js"

const router = express.Router();

router.get('/registroSalida', registroControllerSalida.getRegistroSalida);
router.post('/registroSalida', registroControllerSalida.postRegistroSalida);
router.put('/registroSalida/:id', registroControllerSalida.putRegistroSalida);
router.delete('/registroSalida/:id', registroControllerSalida.deleteRegistroSalida);
router.get('/registroSalida/search', registroControllerSalida.searchRegistroSalida);


export default router;