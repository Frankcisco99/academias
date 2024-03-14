import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Asistencia =  db.define('asistencias',{
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },

    presente:{
        type: DataTypes.BOOLEAN,
        allowNull: false

    }
})

export default Asistencia