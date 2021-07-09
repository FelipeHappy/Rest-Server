const { request, response } = require('express')

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

const postUsuario = (req, res = response) => {

    const {nombre, edad, apodo} = req.body;

    res.json({
        ok: true,
        msg:'post API-Controlador',
        nombre,
        edad,
        apodo
    })
         
    

}

const putUsuario = (req, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg:'put API-Controlador',
        id
    })
}

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