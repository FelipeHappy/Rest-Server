const { Categoria, Producto } = require('../models');
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

 // Verificar si existe el usuario x id

 const validUser = async(id) => {
    const existeId = await Usuario.findById(id);
    if( !existeId ) {
        throw new Error(`El id ${id} del usuario no está registrado en la BD`)
    }
 }

 // Verificar si existe la categoria x id
 const validCategory = async(id) => {
    const existeIdCategory = await Categoria.findById(id);
    if( !existeIdCategory ) {
        throw new Error(`El id ${id} de la categoría no está registrado en la BD`)
    }
 }

 // Verificar si existe la categoria x id
 const validProduct = async(id) => {
    const existeIdProducto = await Producto.findById(id);
    if( !existeIdProducto ) {
        throw new Error(`El id ${id} del producto no está registrado en la BD`)
    }
 }

 //Verificar Colecciones
const colleccionesPermitidas = (colleccion = '', collecciones = []) => {
    
    //Variable para almacenar la colleccion ingresadas con las permitidas en el arreglo
    const incluye = collecciones.includes(colleccion);
    if(!incluye){
        throw new Error(`La coleccion ${colleccion} no está dentro de las colecciones permitidas - ${collecciones}`)
    }
    return true;

}
 
module.exports = {
    validRol,
    validEmail,
    validUser,
    validCategory,
    validProduct,
    colleccionesPermitidas
}