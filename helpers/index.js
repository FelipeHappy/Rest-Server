const dbValidators = require('./db-validators');
const googleVerify = require('./google-verify');
const generarJWT = require('./jwt');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...googleVerify,
    ...generarJWT,
    ...subirArchivo
}