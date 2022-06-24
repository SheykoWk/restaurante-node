const usersControllers = require('./users.controllers')

// todo:
//? get /users ADMIN
//? get /users/:id ADMIN
//? delete /users/me CLIENTE
//? delete /users/:id ADMIN
//? put-patch /users/me CLIENTE USUARIO
//? put-patch /users/:id ADMIN

// /auth/login
// /auth/signin
// /auth/reset-password
// /auth/reset-token
// /auth/verify-account

const getAllUsers = async (req, res) => {

    const users = await usersControllers.getAllUsers()
    res.status(200).json(users)
}


module.exports = {
    getAllUsers
}
