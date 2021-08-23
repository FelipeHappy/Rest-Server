
const path = require('path');
const fs = require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const {Usuario, Producto} = require('../models');


const cargarArchivo = async(req, res = response) => {

    try {

        // const archivoTxt = ['txt', 'md'];
        //Primer parametro : Peticion que retorna un archivo
        //Segundo parametro : Variable extra de extensiones permitidas(Sin contar la validacion del helper)
        //Tercer parametro : Nombre carpeta de destino
        // const pathArchivo = await subirArchivo(req.files, archivoTxt, 'ArchivosTexto');

        const pathArchivo = await subirArchivo(req.files, undefined, 'Img');


        res.json({
            path: pathArchivo
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Error en la carga de archivos',
            error
        })        
    }

}
//ACTUALIZAR IMAGENES CON FIN EDUCATIVO
const actualizarImagen = async(req, res = response) => {

    const { id, colleccion} = req.params;

    let modelo;

    switch(colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        break;

        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'})
    
    
    }
    //Limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', colleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }


    //Guardar imagen en BD, segun coleccion
    const nombreArchivo = await subirArchivo(req.files, undefined, colleccion);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json({
        modelo
    })

}
//Actualizar imagen en cloudinary
const actualizarImagenCloudinary = async(req, res = response) => {

    const { id, colleccion} = req.params;

    let modelo;

    switch(colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        break;

        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'})
    
    
    }
    //Limpiar imagenes previas (Borrar en cloudinary)
    if(modelo.img){
      //Cortamos por el slash el ultimo parametro
      const nombreARR = modelo.img.split('/');
      const name_img = nombreARR [nombreARR.length - 1]
      //Desestructuramos para contraer el id
      const [public_id] = name_img.split('.')
      //Destruimos la imagen anterior la cual se reemplaza por la actualizada
      await cloudinary.uploader.destroy(public_id);
    }

    //Subir a cloudinary
    console.log(req.files.archivo);
    const { tempFilePath } = req.files.archivo
    //De la respuesta nos interesa el secure_url de cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    //Completamos el modelo
    modelo.img = secure_url;
    //Guardamos en el modelo
    await modelo.save();

    res.json({
        modelo
    })

}

const mostrarImagen = async(req, res = response) => {

    const {id, colleccion} = req.params;
    let modelo;

    switch(colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        break;

        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'})
    
    
    }
    //Limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', colleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    //Retornar imagen por defecto de (NO TIENE IMAGEN)
    //Hay que borrar la imagen del servidor
    const pathNotImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNotImage);
        
    }


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}