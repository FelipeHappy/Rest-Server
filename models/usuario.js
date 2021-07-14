const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type: String,
        
    },
    rol_user:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
        
    },
    estado:{
        type: Boolean,
        default: true
    },
    google_signin: {
        type: Boolean,
        default: false
    }

});

//DEBE SER UNA FUNCION NORMAL, NECESITAMOS EL THIS

UsuarioSchema.methods.toJSON = function(){
    //GENERAMOS LA INSTANCIA CON LOS OBJETOS QUE TENEMOS
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);
