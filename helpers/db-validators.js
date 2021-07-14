const Role = require('../models/role');
const Usuario = require('../models/usuario');

//Validar Rol
const validRol = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

 //Verificar si el correo existe
 const validEmail = async(email = '') => {

    const existeEmail = await Usuario.findOne({email});

    //Si existe el email, notifica el problema 
    if ( existeEmail ){
        throw new Error(`El correo ${email} ya está registrado en la BD`)
    }

 } 

 // Verificar si existe el usuario

 const validUser = async(id) => {
    const existeId = await Usuario.findById(id);
    if( !existeId ) {
        throw new Error(`El id ${id} no está registrado en la BD`)
    }
 }
 
module.exports = {
    validRol,
    validEmail,
    validUser
}