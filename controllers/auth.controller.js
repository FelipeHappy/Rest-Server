const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");



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

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;

    try 
    {
        //Utilizamos el middleware del helper verificador de google
        const { name, email, img } = await googleVerify(id_token);

        // //Ingresar con cuenta google
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            //si no existe el usuario, debo crearlo 
            const data = {
                name,
                email,
                password: ':XD',
                img,
                google_signin: true
            };

        //Creamos el usuario
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en base de datos está con estado false
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg:'Todo Ok, Google Sign In',
            usuario,
            token,
        });
        
    } catch (error) {
        
        res.status(400).json({
            msg: 'Token de google invalido'
        });
    }
 

}


module.exports = {
    loginUsuario,
    googleSignIn
}