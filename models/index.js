import Academia from "./Academia.js"
import Alumno from "./Alumno.js"
import Profesor from "./Profesor.js"
import Asistencia from "./Asistencia.js";
// Relación muchos a muchos entre Profesor y Clase
Profesor.belongsToMany(Academia, { through: 'ProfesorAcademia', foreignKey: 'ProfesorId' });
Academia.belongsToMany(Profesor, { through: 'ProfesorAcademia', foreignKey: 'AcademiaId' });

// Relación muchos a muchos entre Academia y Alumno
Academia.belongsToMany(Alumno, { through: 'AcademiaAlumno', foreignKey: 'AcademiaId' });
Alumno.belongsToMany(Academia, { through: 'AcademiaAlumno', foreignKey: 'AlumnoId' });

// Relación uno a muchos entre Academia y Asistencia
Academia.hasMany(Asistencia, { foreignKey: 'AcademiaId' });
Asistencia.belongsTo(Academia, { foreignKey: 'AcademiaId' });

// Relación uno a muchos entre Alumno y Asistencia
Alumno.hasMany(Asistencia, { foreignKey: 'AlumnoId' });
Asistencia.belongsTo(Alumno, { foreignKey: 'AlumnoId' })

export{
    Academia,
    Alumno,
    Profesor,
    Asistencia
}