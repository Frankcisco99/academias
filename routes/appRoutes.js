import express from "express";
import {index, attendance, edit, addStudent,saveStudent, saveAttendance, cerrarSesion, changePassword, changePasswordfunc, academias} from "../controller/appController.js"
import protegerRuta from "../middleware/protegerRuta.js";
const router = express.Router();

router.get("/", protegerRuta, index);
router.get("/attendance/:id", protegerRuta, attendance);
router.post("/attendance/:id", protegerRuta, saveAttendance);
router.get("/academias", protegerRuta, academias);
// router.post("/attendance/:id", protegerRuta, saveAttendance);
router.get('/add', protegerRuta,addStudent)
router.post('/add', protegerRuta,saveStudent)


router.get("/new-password",protegerRuta,changePassword)
router.post("/new-password",protegerRuta,changePasswordfunc)

router.get("/logout",protegerRuta,cerrarSesion)
export default router;