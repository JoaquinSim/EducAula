
function recuperacionClave(usuario,correo,clave){
  let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
  if (usuario == '' && correo == '') {
    alert('Ingrese su datos');
  }else {
    for (let i = 0; i < usuariosRegistrados.length; i++){
      if(usuario == usuariosRegistrados[i].nombreUsuario && correo == usuariosRegistrados[i].correoUsuario){
      document.getElementById('clave').value = usuariosRegistrados[i].claveUsuario;
      //console.log(usuariosRegistrados[i].claveUsuario);
      alert('Contraseña encontrada con exito.')
      return;
      }else {
        alert('Usuario y/o correo no son validos');
      }
      }
  }
}
