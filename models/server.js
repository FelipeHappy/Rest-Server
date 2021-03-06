const express = require('express')
const cors = require('cors');
const { json } = require('express');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');


class Server {

    constructor(){
       this.app = express(); 
       this.port = process.env.PORT;

    // --------- Funciona pero se puede optimizar -------
    //    this.usersPath = '/api/users';
    //    this.authPath = '/api/auth';
    //    this.categoriaPath = '/api/categorias';
    // --------------------------------------------------

    //-----------Optimizacion (Alfabeticamente opcional)----------------
    this.paths = {
        auth: '/api/auth',
        categorias: '/api/categorias',
        usuarios: '/api/users',
        productos:'/api/productos',
        buscar:'/api/buscar',
        uploads: '/api/uploads'
    }
    

       //Conectar a la BD
       this.connectBD();
 
       //Middlewares
       this.middleware();
       
       //Rutas de la aplicacion
       this.routes();
       
    }

    //Funcion para llamar la conexion a la BD
    async connectBD () {
        await dbConnection()
    }

    middleware(){
        
        //CORS
        this.app.use(cors() );

        //Lectura y parseo del body(PARAMETROS ENVIADOS VIA POSTMAN)
        this.app.use(express.json())
        
        //Directorio Publico
        this.app.use(express.static('public'))

        //Carga de archivos (General)
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            //Crear un directorio por defecto al momento de cargar un archivo a una ruta previamente definida en el helper
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/user.routes')),
        this.app.use(this.paths.auth, require('../routes/auth.routes')),
        this.app.use(this.paths.categorias, require('../routes/categorias.routes')),
        this.app.use(this.paths.productos, require('../routes/productos.routes'))
        this.app.use(this.paths.buscar, require('../routes/buscar.routes')),
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))




    }

    listen(){    
        this.app.listen(this.port, () => {
        console.log('Servidor Corriendo en puerto',this.port)
        });
    }

}

module.exports = Server;