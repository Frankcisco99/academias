import { Academia } from "../models/index.js";
import academias from "./academias.js";
import db from "../config/db.js";
const importarDatos = async()=>{
    try {
        //Autenticar con la base de datos
        await db.authenticate();

        //Sincronizar con la base de datos
        await db.sync()

        //Importar los datos
        await Academia.bulkCreate(academias);

        console.log("Datos importados correctamente!")
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}
else if(process.argv[2] === "-e"){
    console.log("Hola")
}
