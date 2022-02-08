
function visualizacion() {
  let elemento;
  let usuarioCrud;
  usuarioCrud = JSON.parse(localStorage.getItem('usuariosCrud'));
  variablePanel = document.getElementById('panel');
  variablePanel.textContent= "";

  for (let i = 0; i < usuarioCrud.length; i++) {
    elemento = document.createElement("option");
    elemento.innerText =
    ` Nombre: ${usuarioCrud[i].nombreUsuario} --
      Cedula: ${usuarioCrud[i].cedulaUsuario} --
      Apellido: ${usuarioCrud[i].apellidoUsuario} --
      Materia: ${usuarioCrud[i].materiaUsuario}`;
    variablePanel.append(elemento);
  }
   usuarios=usuarioCrud;
 console.log('Guardados del localStorage en el array', usuarios);
}




function limpiarFormulario() {
  document.getElementById('usuario').value = "";
  document.getElementById('materia').value = "";
  document.getElementById('cedula').value = "";
  document.getElementById('apellido').value = "";
}

function panelClick() {
  seleccion = panel.selectedIndex;
  document.getElementById('usuario').value = usuarios[seleccion].nombreUsuario;
  document.getElementById('apellido').value = usuarios[seleccion].apellidoUsuario;
  document.getElementById('cedula').value = usuarios[seleccion].cedulaUsuario;
  document.getElementById('materia').value = usuarios[seleccion].materiaUsuario;
}
 visualizacion();
