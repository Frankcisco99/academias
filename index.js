import express from "express";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import appRoutes from "./routes/appRoutes.js"
import db from "./config/db.js"

const app = express();
//Habilitar recepción de datos
app.use(express.urlencoded({extended: true}))
app.use( cookieParser() )
//Conexion a la DB
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión exitosa a MySql DB')
} catch (error) {
    console.log(error)
}

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'pug')
app.set('views', './views')
app.use( express.static('public') )

app.use("/", appRoutes)
app.use("/auth", usuarioRoutes)

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
});