
// GENERALMENTE EN LAS RUTAS; AL NO ENVIAR REFERENCIA SE DIRIGE AUTOMATICAMENTE AL PRIMER ARCHIVO CON NOMBRE "INDEX"

const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaROL = require('../middlewares/validar-rol');
const validarArchivoUpload = require('../middlewares/validar-archivo')


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaROL
}