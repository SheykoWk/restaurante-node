//todo
// ? Crear una funcion que tome como argumento el token y
// ? genere una url como la siguiente:
// ! /auth/verify-account?token=fbdsfdfpoi&user_id=2

const { createToken } = require("./auth.controller")

const generateUrl = (token, userId) => {
    return `/auth/verify-account?token=${token}&user_id=${userId}`
}

const generateVerifyToken = (req, res) => {
    //? esta ruta debe estar dentro de /me/verify-account
    if(!req.user.id){
        res.status(400).json({message: 'Error'})
    }
    const id = req.user.id
    const token = createToken(id)
    res.status(200).json({
        message: 'Confirm your account in the next url',
        url: generateUrl(token, id),
    })

}

const verifyAccount = (req, res) => {
    //* /auth/verify-account?token=fbdsfdfpoi&user_id=2
    if(!req.query){
        res.status(400).json({message: 'Missing Data'})
    }else if(!req.query.token || !req.query.user_id){
        res.status(400).json({message: 'Missing Data'})
    } else {
        //? Verificar mi cuenta de usuario
        //todo crear ambos controladores para modificar la tabla de usuarios a verificado:true
        //todo y la tabla de verify_tokens a used: true
        //? Esta ruta no esta protegida, todo es a base del req.query
        //todo crear las rutas necesarias para verificar la cuenta

    }
}



