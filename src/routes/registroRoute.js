import express, { Router } from "express";
import * as registroController from "../controller/registroController.js"

const router = express.Router();

router.get('/registro', registroController.getRegistro);
router.post('/registro', registroController.postRegistro);
router.put('/registro/:id', registroController.putRegistro);
router.delete('/registro/:id', registroController.deleteRegistro);
router.get('/registro/search', registroController.searchRegistro);


export default router;