const { request, response } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

// Visualizar-Retornar Usuario
const getUsuario = (req = request, res = response) => {
    
    const {q, nombre = 'No name', apikey ,page = 1, limit} = req.query;

    res.json({
        ok: true,
        msg:'get API-Controlador',
        q,
        nombre,
        page,
        limit
    })
}

// Agregar Usuario
const postUsuario = async(req, res = response) => {

    const {name, email, password, rol_user} = req.body;

    //Crear nueva instancia para el usuario
    const usuario = new Usuario({name, email, password, rol_user});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({email});

    //Si existe el email, notifica el problema 
    if ( existeEmail ){
        return res.status(400).json({
            ok: false,
            msg: 'El email ya está registrado'
        })
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar Registro de Usuario
    await usuario.save();

    res.json({
        usuario
    })

}

// Actualizar Usuario
const putUsuario = (req, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg:'put API-Controlador',
        id
    })
}

// Eliminar Usuario
const deleteUsuario = (req, res = response) => {

    const {nombre, edad, apodo} = req.body;

    res.json({
        ok: true,
        msg:'delete API-Controlador',
        nombre,
        edad,
        apodo
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    deleteUsuario,
    putUsuario
}