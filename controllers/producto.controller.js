const { response } = require("express");
const { body } = require("express-validator");
const { Producto } = require('../models')

//Obtener productos - paginado - total - populate
const getProductosTotal= async(req, res = response) => {

     //Inicializamos desde donde queremos capturar nuestros registros
     const { desde = 0, hasta = 5} = req.query;
     //Consultamos el estado si esque queremos dejar a la categoria como "INACTIVO" en vez de eliminarlo
     const query = { estado: true } 
     //Ejecutamos ambas promesas al mismo tiempo
     const [total, productos] = await Promise.all([
         // Contamos cuantos son los usuarios que existen en la bd y luego los retornamos
         Producto.countDocuments(query),
         // Realizamos una consulta que encuentre a los usuarios acorde a los parametros desestructurados anteriormente
         Producto.find(query)
         //Mostramos el nombre del usuario que creó la categoria mediante populate
         .populate('usuario', 'name')
         .skip(Number(desde))
         .limit(Number(hasta))
 
     ])
 
     res.json({
         total,
         productos
     })

}

//Obtener productos - populate - {}
const getProducto = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'name');

    res.json(producto);
}

//Crear Productos

const crearProducto = async(req, res = response) => {

    const {estado, usuario, ...body} = req.body;

    //Buscar productos en BD
    const productoBD = await Producto.findOne({nombre_producto: body.nombre_producto});

        if (productoBD) {
            return res.status(400).json({
            msg: `El producto ${productoBD.nombre_producto}, ya existe`
            })
        }
    //Generar la data a guardar
    const data = {
        ...body,
        nombre_producto: body.nombre_producto.toUpperCase(),
        usuario: req.usuario._id,
        }

    const producto = new Producto(data)

    //Guardar data en BD
    await producto.save();
    res.status(201).json(producto);
         
    }

//Actualizar productos
const putProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    //Solo si viene el nombre lo capitalizaremos
    if (data.nombre_producto) {
        //Grabamos/actualizamos el nombre de la categoria
        data.nombre_producto = data.nombre_producto.toUpperCase();
    }

    //Grabamos al usuario que hizo la modificacion
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json({
        ok: true,
        msg:'put API-Controlador',
        producto
    })
}

//Borrar productos - estado:false

const deleteProducto = async(req, res = response) =>{

    const {id} = req.params;

    //Eliminarlo Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Luego de validar el token, lo citamos en el controlador
    // const uid = req.uid;

    //Cambiar el estado del usuario
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false });

    // //Imprimir usuario autenticado
    // const usuarioAutenticado = req.usuario;

    res.json({
        ok: true,
        msg:'delete API-Controlador',
        productoBorrado,
        
    })
}

module.exports = {
    crearProducto,
    getProductosTotal,
    getProducto,
    putProducto,
    deleteProducto
}