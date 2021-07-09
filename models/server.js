const express = require('express')
const cors = require('cors');
const { json } = require('express');


class Server {

    constructor(){
       this.app = express(); 
       this.port = process.env.PORT;
       this.usersPath = '/api/users';
 
       //Middlewares
        this.middleware();
       //Rutas de la aplicacion
       this.routes();
       
    }
    middleware(){
        
        //CORS
        this.app.use(cors() );

        //Lectura y parseo del body(PARAMETROS ENVIADOS VIA POSTMAN)
        this.app.use(express.json())
        
        //Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    listen(){    
        this.app.listen(this.port, () => {
        console.log('Servidor Corriendo en puerto',this.port)
        });
    }

}

module.exports = Server;