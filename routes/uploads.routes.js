const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { colleccionesPermitidas } = require('../helpers');
const { validarArchivoUpload } = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',validarArchivoUpload, cargarArchivo)

router.put('/:colleccion/:id',[
    validarArchivoUpload,
    check('id','El id debe ser de Mongo').isMongoId(),
    check('colleccion').custom( c => colleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
] , actualizarImagenCloudinary)

router.get('/:colleccion/:id', [
    check('id','El id debe ser de Mongo').isMongoId(),
    check('colleccion').custom( c => colleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
] ,mostrarImagen)

module.exports = router;