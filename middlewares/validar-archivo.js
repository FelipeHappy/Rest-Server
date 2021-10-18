

const validarArchivoUpload = async(req, res = response, next) => {

    //Validamos que la carga no venga vacia
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({msg: 'No hay archivos que subir'});
      return;
    }
    next();
}

module.exports = {
    validarArchivoUpload
}