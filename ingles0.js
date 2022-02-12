function subirMaterial(archivoSubidoIngles) {
 let archivoSubido = archivoSubidoIngles;
 if (archivoSubido == '' || archivoSubido == null) {
   alert('Seleccione el archivo');
 }else {
   localStorage.setItem('archivoSubidoIngles' ,(archivoSubido));
  // mostrarArchivo();
   alert('Archivo subido');
 }
}
function mostrarNota() {
  let notaEstudianteIngles = JSON.parse(localStorage.getItem('Observacion del estudiante'));
  document.getElementById('notaDelEstudiante').value = JSON.stringify(notaEstudianteIngles);
}
mostrarNota();
/*
function mostrarArchivo(){
document.getElementById('archivoSubido').innerHtml = archivoSubido;
}*/
