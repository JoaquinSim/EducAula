function buscarEstudiante(estudiante) {
  let estudianteBuscado = JSON.parse(localStorage.getItem('usuariosCrud'));
  for (let i = 0; i < estudianteBuscado.length; i++){
    if(estudiante == estudianteBuscado[i].nombreUsuario){
      document.getElementById('nombreEstudiante').value =  estudianteBuscado[i].cedulaUsuario;
    }
    }
}
function observacionEstudiante(nota,observacionEstudinate) {
    let notaEstudiante = nota;
    let observacionAlEstudiante= observacionEstudinate;
  let objetoEstudiante = {
    Notadelestudiante: notaEstudiante,
    ObservacionalEstudiante:observacionAlEstudiante
  }
  if (notaEstudiante < 70) {
    localStorage.setItem('Observacion del estudiante',JSON.stringify(objetoEstudiante));
    document.getElementById('onbservacionCalificacion').value = JSON.stringify(objetoEstudiante);
    alert('Calificacione enviada con exito');

  }
  if (notaEstudiante >= 70 ) {
    localStorage.setItem('Observacion del estudiante',JSON.stringify(objetoEstudiante));
    document.getElementById('onbservacionCalificacion').value = JSON.stringify(objetoEstudiante);
    alert('Calificacione enviada con exito');

  }
}
function enviarNota(nota) {
  let notaEstudiante = nota;
  if (notaEstudiante < '0' || notaEstudiante > '100') {
    console.log('Error nota no valida',notaEstudiante);
    alert('Nota ingresada no valida la nota debe ser mayor que 0 y menor que 100');
  }else {
    localStorage.setItem('notaEstudiante',notaEstudiante);
    alert('Calificacione enviada con exito');
  }
}
function cerrarSesion() {
  window.location= '../ProyectoFDP-entregable/Loginn/login.html';
  usuarioLogueado = [];
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
  console.log('Sesion cerrada', usuarioLogueado);
}/*
function mostrarRol() {
  let usuariosLogueado = JSON.parse(localStorage.getItem('usuariosRegistrados'));
  for (let i = 0; i < usuariosLogueado.length; i++){
    if(usuariosLogueado[i].rangoUsuario == 'Maestro'){
      document.getElementById('usuarioLogueado').innerHTML = 'Maestro: ' + usuariosLogueado[i].nombreUsuario;
    }
}
}
mostrarRol();*/
