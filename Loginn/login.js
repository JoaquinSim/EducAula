
function validarUsuario(usuario,clave){
  let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
  if (usuario == '' && clave == '') {
    swal('Ingrese su datos');
  }else {
    for (let i = 0; i < usuariosRegistrados.length; i++){
      if(usuario == usuariosRegistrados[i].nombreUsuario && clave == usuariosRegistrados[i].claveUsuario){
        localStorage.setItem('usuarioLogueado',JSON.stringify(usuariosRegistrados[i]));
        window.location = '../index.html';
      }else {
        //alert('Usuario y/o contraseña no son validos');
      }
      }
  }

}

function verficarClave() {

}
verficarClave();
