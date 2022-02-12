var usuarios = [];
let seleccion;
let variablePanel;

function cerrarSesion() {
  window.location= '../ProyectoFDP-entregable/Loginn/login.html';
  usuarioLogueado = [];
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
  console.log('Sesion cerrada', usuarioLogueado);
}

function crearUsuario(usuario,clave,apellido,correo) {
  let nombreUsuario = usuario;
  let apellidoUsuario = apellido;
  let claveUsuario = clave;
  let correoUsuario = correo;

  let objetoUsuario =
  {nombreUsuario : nombreUsuario,
  correoUsuario : apellidoUsuario,
  apellidoUsuario : correoUsuario,
  claveUsuario : claveUsuario};
  usuarios.push(objetoUsuario);
  localStorage.setItem('usuariosCrud', JSON.stringify(usuarios));
  limpiarFormulario();
  console.log('Creados', usuarios);
  visualizacion();
}


function actualizar() {
  usuarios[seleccion].nombreUsuario = document.getElementById('usuario').value ;
  usuarios[seleccion].apellidoUsuario = document.getElementById('apellido').value;
  usuarios[seleccion].correoUsuario = document.getElementById('correo').value;
  usuarios[seleccion].claveUsuario = document.getElementById('clave').value  ;
  usuarioCrud = localStorage.setItem('usuariosCrud', JSON.stringify(usuarios));
  usuarios=usuarioCrud;
    visualizacion();
  console.log('Actualizado', usuarios);
}


function eliminar() {
  usuarios.splice(seleccion, 1);
  localStorage.setItem('usuariosCrud', JSON.stringify(usuarios));
  visualizacion();
  limpiarFormulario();
  console.log('Eliminado',usuarios)
}


function verificarInicioSesion() {
let usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
//console.log(usuarioLogueado);
if(usuarioLogueado == '' || usuarioLogueado == null )  {
  alert('No tiene una sesion activa Redireccionando...');
  window.location = '../ProyectoFDP-entregable/Loginn/login.html';

}else {
  swal('Ya tiene una sesion activa');
}
}
verificarInicioSesion();

function mostrarRol() {
  let usuariosLogueado = JSON.parse(localStorage.getItem('usuariosRegistrados'));
  for (let i = 0; i < usuariosLogueado.length; i++){
    if(usuariosLogueado[i].rangoUsuario == 'Estudiante'){
      document.getElementById('usuarioLogueado').innerHTML = 'Estudiante: ' + usuariosLogueado[i].nombreUsuario;
    }
    }
}
mostrarRol();
