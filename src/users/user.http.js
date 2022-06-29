const config = require('../config')
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

    // ?offset=0
    //* limit=5

    //* page
    //* start

    const offset = req.query.offset
    const limit = req.query.limit

    const totalLength = await usersControllers.getPaginatedUsers()
    //  limit, offset, size, length
    const users = await usersControllers.getPaginatedUsers(offset, limit)




    res.status(200).json({
        _links: {
            "base": `${config.domainHost}/users`,
            "next": "/page?limit=5&start=5",
            "prev": ""
        },
        total: totalLength.length,
        limit: 5,
        size: users.length,
        results: users
    })
}


module.exports = {
    getAllUsers
}
