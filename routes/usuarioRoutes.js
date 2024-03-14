import express from 'express';
import {crearCuenta, registrar, formularioLogin, autenticar, olvidePassword} from "../controller/usuarioController.js"
const router = express.Router()

router.get('/login', formularioLogin)
router.post('/login', autenticar)

router.get('/registro', crearCuenta)
router.post('/registro', registrar)

router.get('/olvide-password', olvidePassword)


export default router;