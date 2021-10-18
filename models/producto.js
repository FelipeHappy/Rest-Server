const { Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    
    nombre_producto:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        //Referencia al usuario que retorna el UsuarioSchema, la cual retorna el usuario via ID
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        //Referencia al usuario que retorna el UsuarioSchema, la cual retorna el usuario via ID
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }

})

//EXTRAER RESPUESTAS DEL RETURN
//DEBE SER UNA FUNCION NORMAL, NECESITAMOS EL THIS
ProductoSchema.methods.toJSON = function(){
    //GENERAMOS LA INSTANCIA CON LOS OBJETOS QUE TENEMOS
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema)