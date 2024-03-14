
function eliminarCookie(nombre) {
    document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Función que se ejecutará al hacer clic en el botón
function cerrarSesion() {
    eliminarCookie('_token');
  }

  // Asociar la función al evento click del botón
document.getElementById('cerrarSesionBtn').addEventListener('click', cerrarSesion);


