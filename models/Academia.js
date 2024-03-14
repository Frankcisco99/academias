import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Academia = db.define('academias', {
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
})

export default Academia;