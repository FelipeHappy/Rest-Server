const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, isAdminRole } = require('../middlewares');
const { validarJWT } = require('../middlewares');
const { crearCategoria, getCategoria, getCategoriasTotal, putCategoria, deleteCategoria } = require('../controllers/categoria.controller');
const { validCategory } = require('../helpers/db-validators');



const router = Router();

// Obtener todas las categorias - publico
router.get('/', [
    
],  getCategoriasTotal)


//Obtener categoria por id - publico
router.get('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validCategory),
    validarCampos
], getCategoria)


//Crear categoria - privado - cualquier user con token valido
router.post('/', [
    validarJWT,
    check('nombre_categoria','el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar categoria - privado - cualquier user con token valido
router.put('/:id', [
    validarJWT,
    check('nombre_categoria','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(validCategory),
    validarCampos
], putCategoria)

//Borrar categoria - privado - user ADMIN
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(validCategory),
    validarCampos,
], deleteCategoria )




module.exports = router;