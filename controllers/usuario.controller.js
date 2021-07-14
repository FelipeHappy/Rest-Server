const { request, response } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

// Visualizar-Retornar Usuario
const getUsuario = async(req = request, res = response) => {

    //Inicializamos desde donde queremos capturar nuestros registros
    const { desde = 0, hasta = 5} = req.query;
    //Consultamos el estado si esque queremos dejar al usuario como "INACTIVO" en vez de eliminarlo
    const estado = { estado: true }

    // const usuarios = await Usuario.find(estado)
    // .skip(Number(desde))
    // .limit(Number(hasta))

    // const totalUsers = await Usuario.countDocuments(estado);


    //Ejecutamos ambas promesas al mismo tiempo
    const [total, usuarios] = await Promise.all([
        // Contamos cuantos son los usuarios que existen en la bd y luego los retornamos
        Usuario.countDocuments(estado),
        // Realizamos una consulta que encuentre a los usuarios acorde a los parametros desestructurados anteriormente
        Usuario.find(estado)
        .skip(Number(desde))
        .limit(Number(hasta))

    ])

    res.json({
        ok: true,
        msg:'get API-Controlador',
        total,
        usuarios
    })
}

// Agregar Usuario
const postUsuario = async(req, res = response) => {

    const {name, email, password, rol_user} = req.body;

    //Crear nueva instancia para el usuario
    const usuario = new Usuario({name, email, password, rol_user});

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
const putUsuario = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google_signin, email, ...resto} = req.body

    // Validar contra la base de datos
    if( password ){

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        ok: true,
        msg:'put API-Controlador',
        usuario
    })
}

// Eliminar Usuario
const deleteUsuario = async(req, res = response) => {

    const {id} = req.params;

    //Eliminarlo Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        ok: true,
        msg:'delete API-Controlador',
        usuario
    })
}

module.exports = {
    getUsuario,
    postUsuario,
    deleteUsuario,
    putUsuario
}