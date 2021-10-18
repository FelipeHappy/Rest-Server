const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionValida = ['png','jpg', 'jpeg','gif'], carpeta = '') => {

    //Realizamos una promesa para ver si el codigo resuelve o rechaza
    return new Promise( (resolve, reject) => {

    //Desestructuramos lo que queremos obtener de la req.files
     const {archivo} = files;
     const nombreCortado = archivo.name.split('.');
 
    //Extraemos la extension del archivo que por lo general siempre está en la ultima posicion
     const extension = nombreCortado[nombreCortado.length - 1]
 
    // Validar extensiones permitidas
    //  const extensionValida = ['png','jpg', 'jpeg','gif'];
 
     if(!extensionValida.includes(extension)){
         return reject(`La extension ${extension} no está permitida, ${ extensionValida }`)   
     }
    //Ubicar y cambiar nombre del archivo, a ello le concatenamos el punto junto con su extension correspondiente
     const nombreTemp = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
     const uploadPath = path.join( __dirname, '../uploads/', carpeta , nombreTemp);
 
     archivo.mv(uploadPath, (err) => {
         if(err) {
             reject(err);
         }
         resolve(nombreTemp);
     })

    })

    
}

module.exports = {
    subirArchivo
}