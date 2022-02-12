function cerrarSesion() {
  window.location= '../Loginn/login.html';
  usuarioLogueado = [];
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
  console.log('Sesion cerrada', usuarioLogueado);
}
function subirMaterial(archivoSubidoLiteratura) {
 let archivoSubido = archivoSubidoLiteratura;
 if (archivoSubido == '' || archivoSubido == null) {
   alert('Seleccione el archivo');
 }else {
   localStorage.setItem('archivoSubidoLiteratura' ,(archivoSubido));
   exito();
   //mostrarArchivo();
   console.log(archivoSubido);
 }

}
function exito() {
  alert('Archivo subido');
}/*
function mostrarArchivo(){
document.getElementById('archivoSubido').innerHTML = archivoSubido;
}*/
