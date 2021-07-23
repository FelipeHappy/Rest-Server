const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

//Para validar los parametros asignados en el header debemos leer lo que contrae
const validarJWT = async(req = request, res = response, next) => {
    
   const token = req.header('x-token');

   if(!token){
       return res.status(401).json({
           msg: 'No hay token en la peticion'
       })
   }

   try {

    // Verificacion de la validez del JWT
    // jwt.verify(token, process.env.SECRETKEY);

    // Exportamos la data que necesitamos para utilizarla como referencia

        const { uid } = jwt.verify(token, process.env.SECRETKEY);   
        
        //Leemos el usuario de la BD
        const usuario = await Usuario.findById(uid);

        //Verificamos si el usuario existe
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - No encontró registro en BD'
            })
        }
        
        //Verificar si el usuario está activo
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido - No encontró usuario'
            })
        }
        req.usuario = usuario;

        next();
       
   } catch (error) {
       console.log(error)
       res.status(401).json({
           msg: 'Token no valido'
       })
   }
}

module.exports = {
    validarJWT
}