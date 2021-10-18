const { response } = require("express");
const { Categoria } = require('../models')

//Obtener categorias - paginado - total - populate
const getCategoriasTotal= async(req, res = response) => {

     //Inicializamos desde donde queremos capturar nuestros registros
     const { desde = 0, hasta = 5} = req.query;
     //Consultamos el estado si esque queremos dejar a la categoria como "INACTIVO" en vez de eliminarlo
     const query = { estado: true } 
     //Ejecutamos ambas promesas al mismo tiempo
     const [total, categorias] = await Promise.all([
         // Contamos cuantos son los usuarios que existen en la bd y luego los retornamos
         Categoria.countDocuments(query),
         // Realizamos una consulta que encuentre a los usuarios acorde a los parametros desestructurados anteriormente
         Categoria.find(query)
         //Mostramos el nombre del usuario que creó la categoria mediante populate
         .populate('usuario', 'name')
         .skip(Number(desde))
         .limit(Number(hasta))
 
     ])
 
     res.json({
         total,
         categorias
     })

}

//Obtener categorias - populate - {}
const getCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'name');

    res.json(categoria);
}

//Crear Categoria

const crearCategoria = async(req, res = response) => {

    const nombre_categoria = req.body.nombre_categoria.toUpperCase();

    //Buscar categoria en BD
    const categoriaBD = await Categoria.findOne({nombre_categoria});

        if (categoriaBD) {
            return res.status(400).json({
            msg: `La categoria ${categoriaBD.nombre_categoria}, ya existe`
            })
        }
    //Generar la data a guardar
    const data = {
        nombre_categoria,
        usuario: req.usuario._id
        }

    const categoria = new Categoria(data)

    //Guardar data en BD
    await categoria.save();
    res.status(201).json(categoria);
         
    }

//Actualizar categoria
const putCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    //Grabamos/actualizamos el nombre de la categoria
    data.nombre_categoria = data.nombre_categoria.toUpperCase();
    //Grabamos al usuario que hizo la modificacion
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.json({
        ok: true,
        msg:'put API-Controlador',
        categoria
    })
}

//Borrar categoria - estado:false

const deleteCategoria = async(req, res = response) =>{

    const {id} = req.params;

    //Eliminarlo Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Luego de validar el token, lo citamos en el controlador
    // const uid = req.uid;

    //Cambiar el estado del usuario
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false });

    // //Imprimir usuario autenticado
    // const usuarioAutenticado = req.usuario;

    res.json({
        ok: true,
        msg:'delete API-Controlador',
        categoriaBorrada,
        
    })
}

module.exports = {
    crearCategoria,
    getCategoriasTotal,
    getCategoria,
    putCategoria,
    deleteCategoria
}