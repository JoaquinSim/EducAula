var usuarios = [];
let seleccion;
let variablePanel;

function cerrarSesion() {
  window.location= '../ProyectoFDP-entregable/Loginn/login.html';
  usuarioLogueado = [];
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
  console.log('Sesion cerrada', usuarioLogueado);
}
function mostrarRol() {
  let usuariosLogueado = JSON.parse(localStorage.getItem('usuariosRegistrados'));
  for (let i = 0; i < usuariosLogueado.length; i++){
    if(usuariosLogueado[i].rangoUsuario == 'Maestro'){
      document.getElementById('usuarioLogueado').innerHTML = 'Maestro: ' + usuariosLogueado[i].nombreUsuario;
    }else {
      alert('Redireccionando...')
    window.location='index0.html';
    }
    }
}
mostrarRol();
function crearUsuario(usuario,materia,apellido,cedula) {
  let nombreUsuario = usuario;
  let apellidoUsuario = apellido;
  let materiaUsuario = materia;
  let cedulaUsuario = cedula;

  let objetoUsuario =
  {nombreUsuario : nombreUsuario,
  cedulaUsuario : cedulaUsuario,
  apellidoUsuario : apellidoUsuario,
  materiaUsuario : materiaUsuario};
  usuarios.push(objetoUsuario);
  localStorage.setItem('usuariosCrud', JSON.stringify(usuarios));
  limpiarFormulario();
  console.log('Creados', usuarios);
  visualizacion();
}


function actualizar() {
  usuarios[seleccion].nombreUsuario = document.getElementById('usuario').value ;
  usuarios[seleccion].apellidoUsuario = document.getElementById('apellido').value;
  usuarios[seleccion].correoUsuario = document.getElementById('cedula').value;
  usuarios[seleccion].claveUsuario = document.getElementById('materia').value  ;
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


function verificarRol(){
  let rol = JSON.parse(localStorage.getItem('usuarioLogueado'));
  for (let i = 0; i < rol.length; i++){
    if(rol[i].rangoUsuario == 'Maestro' ){
      console.log('ROOL',rol);
      alert('Usted es maestro');
    }else {
      alert('Usted no es maestro');
    }
    }
  }
verificarRol();
