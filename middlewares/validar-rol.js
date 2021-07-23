const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el Rol sin validar el token'
        })
    }

    const {rol_user, name} = req.usuario;

    //Validamos si el rol es de Administrador
    if(rol_user !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${ name } no tiene permisos para eliminar`
        })
    }

    next();
}

const tieneROL = (...roles) => {
    //Debe Retornar una funcion para que funcione el middleware
    return (req, res = response, next) => {

        console.log(roles, req.usuario.rol_user)

        //Verificamos si tiene token 
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el Rol sin validar el token'
            })
        }
        //Verificamos si la respuesta contiene un usuario con un rol
        if(!roles.includes(req.usuario.rol_user)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }
    

}

module.exports = {
    isAdminRole,
    tieneROL
}