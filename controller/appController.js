import { check, validationResult } from "express-validator"
import { Profesor, Academia, Alumno, Asistencia} from "../models/index.js"
import { token, generarJWT } from "../helpers/token.js";
import bcrypt from "bcrypt";
const index = async (req, res) =>{
    const { id } = req.usuario
    const usuario = await Profesor.scope('eliminarPassword').findByPk(id);

    res.render('app/home',{
        pagina: "Home",
        usuario,
        datos: {}
    })

}

const academias = async (req, res) =>{
    const { id } = req.usuario
    const usuario = await Profesor.scope('eliminarPassword').findByPk(id);
    const academias = await usuario.getAcademias({
        attributes: ['id', 'nombre'],
        raw: true})

    res.render('app/academias',{
        pagina: "Asistencia",
        academias,
        datos:{}
    })
}
const attendance = async (req,res) =>{
    const { id } = req.params
    const academia = await Academia.findByPk(id, {
        include: [{
          model: Alumno,
          through: 'AcademiaAlumno', // Nombre de la tabla intermedia
        }],
      });
      console.log(academia)
    res.render('app/attendance',{
        pagina: "Asistencia",
        academia,
        datos:{}
    })
}

const saveAttendance = async ( req, res ) =>{
    const { id } = req.params;
    const { fecha, presentes } = req.body;
    // Normaliza presentes a un arreglo si es un solo valor
    const presentesArray = Array.isArray(presentes) ? presentes : [presentes];

    // Itera sobre todos los alumnos y determina si están presentes o ausentes
    await Promise.all(presentesArray.map(async (alumno) => {
        await Asistencia.create({
            AlumnoId: alumno,
            fecha,
            presente:true, // Este campo será true si el alumno está presente y false si está ausente
            AcademiaId: id
        });
    }));

   
    res.redirect("/");
}



const addStudent = async(req,res) =>{
    const {id} = req.usuario
    
    const profesor = await Profesor.findByPk(id)
    
    if(!profesor){
        return "Error"
    }

    const academias = await profesor.getAcademias({
        attributes: ['id', 'nombre'],
        raw: true,
    })
    res.render('app/add',{
        pagina: "Añadir Estudiante",
        academias,
        datos: {}
    })
}

const saveStudent = async (req, res) =>{
    const {nombre,curso,edad,academias} = req.body

    const alumno = await Alumno.create({
        nombre,
        curso,
        edad

    })

    const academia = await Academia.findByPk(academias)
    if(academia){
        await alumno.addAcademia(academia)
    }
 
}

const cerrarSesion = async(req,res) =>{
    res.clearCookie('_token');
    res.redirect("/auth/login")
}

const changePassword = async(req,res) =>{
    res.render('app/pass',{
        pagina: "Cambiar Password"
    })
}

const changePasswordfunc = async(req,res) =>{ 
    await check('oldPass').isLength({min:6}).withMessage('La contraseña debe tener un minimo de 6 caracteres').run(req)
    await check('newPass').isLength({min:6}).withMessage('La contraseña debe tener un minimo de 6 caracteres').run(req)
    const {id} = req.usuario
    const {oldPass, newPass} = req.body;
    const profesor = await Profesor.findByPk(id)
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
         return res.render('app/pass',{
         pagina: "Cambiar Password",
             errores: resultado.array()
         })
    }
    
    if(!profesor.verificarPassword(oldPass)){
        return res.render('app/pass',{
            pagina: "Iniciar Sesión",
            errores: [{msg: "Password incorrecta"}]
        })
    }
    //Hashear el nuevo password con bcrypt
    const salt = await bcrypt.genSalt(10)
    profesor.password = await bcrypt.hash(newPass, salt)
    await profesor.save()
    res.clearCookie('_token');
    res.redirect("/auth/login")

}
 
export {
    index,
    attendance,
    addStudent,
    saveStudent,
    saveAttendance,
    cerrarSesion,
    changePassword,
    changePasswordfunc,
    academias
}