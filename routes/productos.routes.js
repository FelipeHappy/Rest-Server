const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos, isAdminRole } = require('../middlewares');
const { validarJWT } = require('../middlewares');
const { validProduct, validCategory } = require('../helpers/db-validators');
const { getProductosTotal, getProducto, crearProducto, putProducto, deleteProducto } = require('../controllers/producto.controller');



const router = Router();

// Obtener todas los productos - publico
router.get('/', [
    
],  getProductosTotal)


//Obtener productos por id - publico
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validProduct),
    validarCampos
], getProducto)


//Crear productos - privado - cualquier user con token valido
router.post('/', [
    validarJWT,
    check('nombre_producto','el nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    check('categoria').custom(validCategory),

    validarCampos
], crearProducto)

//Actualizar productos - privado - cualquier user con token valido
router.put('/:id', [
    validarJWT,
    check('nombre_producto','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(validProduct),
    validarCampos
], putProducto)

//Borrar productos - privado - user ADMIN
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(validProduct),
    validarCampos,
], deleteProducto )


module.exports = router;