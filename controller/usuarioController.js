import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator"
import Profesor from "../models/Profesor.js"
import { token, generarJWT } from "../helpers/token.js";
const crearCuenta = (req, res) =>{
    res.render('auth/registro',{
        pagina: "Crear Cuenta"
    })
}

const registrar = async (req, res) =>{
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio!').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min:6}).withMessage('La contraseña debe tener un minimo de 6 caracteres').run(req)
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render('auth/registro',{
            pagina: "Registro",
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    const existeUsuario = await Profesor.findOne({where: {email: req.body.email}})
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: "Registro",
            errores: [{msg: "El usuario ya existe"}],
        })
    }

    const {nombre, email, password} = req.body;

    const usuario = await Profesor.create({
        nombre,
        email,
        password,
        token: token()
    })

    res.send('<h1>Usuario creado correctamente</h1>')
}

const formularioLogin = (req,res) =>{
    res.render('auth/login', {
        pagina: "Iniciar Sesión"
    })
}


const autenticar = async (req, res) => {
    await check('email').isEmail().withMessage('El Email es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña debe tener un minimo de 6 caracteres').run(req)

    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            errores: resultado.array()
        })
    }

    const {email, password} = req.body

    const usuario = await Profesor.findOne({where: {email}})

    //Comprobar si existe el usuario
    if(!usuario){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            errores: [{msg: "El usuario no existe"}]
        })
    }

    //Comprobar si el usuario esta con su cuenta confirmada
    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            errores: [{msg: "Tu cuenta no ha sido confirmada"}]
        })
    }

    //Verificar password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: "Iniciar Sesión",
            errores: [{msg: "Password incorrecta"}]
        })
    }

    //Autenticar al usuario
    const jwt = generarJWT({id: usuario.id, nombre: usuario.nombre})
    
    return res.cookie('_token', jwt, {
        httpOnly: true
    }).redirect('/')
}



const olvidePassword = (req,res) =>{
    res.render('auth/olvide-password', {
        pagina: "Recuperar Contraseña"
    })
}


export{
    crearCuenta,
    registrar,
    formularioLogin,
    autenticar,
    olvidePassword
}