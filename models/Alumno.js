import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Alumno =  db.define('alumnos',{
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    curso:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

export default Alumno