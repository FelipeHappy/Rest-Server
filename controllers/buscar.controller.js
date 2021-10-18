const { response } = require("express");
// const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'roles',
    'productos'
];

// BUSCAR POR USUARIOS
const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino)
    
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        //Retorna el usuario , si no existe, retorna un arreglo vacio
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    //Expresion regulares
    const regex = new RegExp(termino, 'i')

    //Buscar con condiciones
    const usuarios = await Usuario.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{estado: true}]
    })
    res.json({
        results: usuarios
    })

}
// BUSCAR POR CATEGORIAS
const buscarCategorias = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino)
    
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        //Retorna el usuario , si no existe, retorna un arreglo vacio
        res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    //Expresion regulares
    const regex = new RegExp(termino, 'i')

    //Buscar con condiciones
    const categorias = await Categoria.find({nombre_categoria: regex, estado: true})
    res.json({
        results: categorias
    })

}
// BUSCAR POR PRODUCTOS
const buscarProducto = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino)
    
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria','nombre_categoria');
        //Retorna el usuario , si no existe, retorna un arreglo vacio
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    //Expresion regulares
    const regex = new RegExp(termino, 'i')

    //Buscar con condiciones
    const productos = await Producto.find({nombre_producto: regex, estado: true}).populate('categoria','nombre_categoria');
    res.json({
        results: productos
    })

}

// Metodo Core a exportar
const buscar = (req, res = response) => {
    
    const {colleccion, termino} = req.params;

    if( !coleccionesPermitidas.includes(colleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }
        switch (colleccion) {
            case 'usuarios':
                buscarUsuarios(termino, res)
            break;

            case 'categorias':
                buscarCategorias(termino, res)
            break;

            case 'productos':
                buscarProducto(termino, res)
            break;

            case 'roles':
            break;

            default:
                res.status(500).json({
                    msg: `Se le olvidó hacer esta busqueda`
                })
        }
    }
module.exports = {
    buscar
}