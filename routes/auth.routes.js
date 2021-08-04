const { Router } = require('express');
const { check } = require('express-validator');
const { loginUsuario, googleSignIn } = require('../controllers/auth.controller');
const { validRol , validEmail, validUser } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
    
] ,loginUsuario );

router.post('/google',[
    check('id_token','El token es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos,
    
] , googleSignIn );

module.exports = router;