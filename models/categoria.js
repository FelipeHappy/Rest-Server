const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    
    nombre_categoria:{
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
    }
})

//EXTRAER RESPUESTAS DEL RETURN
//DEBE SER UNA FUNCION NORMAL, NECESITAMOS EL THIS
CategoriaSchema.methods.toJSON = function(){
    //GENERAMOS LA INSTANCIA CON LOS OBJETOS QUE TENEMOS
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Categoria', CategoriaSchema)