const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validRol , validEmail, validUser } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuario);

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

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validUser),
    check('rol_user').custom(validRol),
    validarCampos
], putUsuario);

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(validUser),
    validarCampos
], deleteUsuario);

module.exports = router;