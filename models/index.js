// GENERALMENTE EN LAS RUTAS; AL NO ENVIAR REFERENCIA SE DIRIGE AUTOMATICAMENTE AL PRIMER ARCHIVO CON NOMBRE "INDEX"

const Usuario = require('./usuario');
const Server = require('./server');
const Role = require('./role');
const Categoria = require('./categoria');
const Producto = require('./producto');


module.exports = {
    Server,
    Role,
    Usuario,
    Categoria,
    Producto
}