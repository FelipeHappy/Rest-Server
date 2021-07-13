const { validationResult } = require("express-validator");
const { request , response} = require('express')


const validarCampos = (req, res = response, next) => {

    
    // Inicializamos la variable en caso de que existan errores
    const errors = validationResult(req);

    // Verificamos si el campo de errores está vacio
    if( !errors.isEmpty()){
        return res.status(400).json(errors)
    }
    // Ejecuta los middlewares de manera secuencial
    next(); 
}

module.exports = { 
    validarCampos
}