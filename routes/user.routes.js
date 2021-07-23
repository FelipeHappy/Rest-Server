const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validRol , validEmail, validUser } = require('../helpers/db-validators');

const { validarCampos, validarJWT, isAdminRole, tieneROL } = require('../middlewares/index');

const router = Router();

//Retorno Usuario/ Listar Usuario
router.get('/', getUsuario);

//Agregar Usuario
router.post('/', [

    check('name', 'El nombre no es valido').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    // check('rol_user', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),

    check('email').custom(validEmail),
    check('rol_user').custom(validRol),

    //Ejecutamos nuestro archivo del directorio middlewares, para que revise los posibles errores antes de que pase al controlador
    validarCampos
    ], postUsuario);

//Actualizar Usuario
router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validUser),
    check('rol_user').custom(validRol),
    validarCampos
], putUsuario);


//Eliminar Usuario
router.delete('/:id', validarJWT,
    // isAdminRole,
    tieneROL('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
    [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validUser),
    validarCampos
], deleteUsuario);


module.exports = router;