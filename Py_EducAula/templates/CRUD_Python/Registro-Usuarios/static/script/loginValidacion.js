var usuarios = [];

function crearUsuarioTemporal(usuario,apellido,correo,clave,rolUsuario){
  if (usuario == '' && clave =='' && correo == '' && clave == '' && rolUsuario == '') {
    swal('Ingrese los datos');
  }else {
    let objetoUsuario =
    {nombreUsuario : usuario,
    apellidoUsuario : apellido,
    correoUsuario : correo,
    claveUsuario : clave,
    rangoUsuario: rolUsuario};
    usuarios.push(objetoUsuario);
    console.log(objetoUsuario);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
    window.location = '../Loginn/login.html';
  }

}

function limpiarFormulario() {
  document.getElementById('usuario').value = "";
  document.getElementById('clave').value = "";
  document.getElementById('correo').value = "";
  document.getElementById('apellido').value = "";
}
/*
function validarRango() {
 document.getElementById('rol').value = usuarios.rangoUsuario;
}*/
