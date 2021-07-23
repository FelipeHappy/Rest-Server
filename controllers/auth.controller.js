const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");



const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
    
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ email }) 
        
        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario / password no coincide '
            })
        }

        //Verificar si el usuario se encuentra activo en la BD
        if( usuario.estado === false){
            return res.status(400).json({
                msg: 'El usuario / password no coincide'
            })
        }

        //Verificar la contraseña
        const passValido = bcrypt.compareSync(password, usuario.password);

        //Si las contraseñas no coinciden..
        if( !passValido) {
            return res.status(400).json({
                msg:'La contraseña no coincide'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            ok: true,
            msg:'Login ok',
            usuario,
            token
        })
        
    } catch (error) {  

        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error, contacte con el administrador'
        })
    }
    

}

module.exports = {
    loginUsuario
}