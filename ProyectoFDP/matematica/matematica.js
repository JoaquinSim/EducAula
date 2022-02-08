function subirMaterial(archivoSubidoMatematica) {
 let archivoSubido = archivoSubidoMatematica;
 if (archivoSubido == '' || archivoSubido == null) {
   alert('Seleccione el archivo');
 }else {
   localStorage.setItem('archivoSubidoMatematica' ,(archivoSubido));
  // mostrarArchivo();
   alert('Archivo subido');
 }
}
