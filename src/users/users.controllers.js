const crypto = require('../tools/crypt');
const uuid = require('uuid');
const users = require('../database/models/init-models').initModels().users;

//Cualquier usuario
const registerUser = (data) => {
    // todo: La contraseña tiene que estar encriptada con bcrypt
    const hashedPassword = crypto.hashPassword(data.password);
    const userId = uuid.v4();
    const newUser = users.create({
        id: userId,
        ...data,
        password: hashedPassword
    })

    return {
        message: `User created succesfully with the id: ${userId}`,
        user: newUser,
    };
}

//Solo administradores
const getAllUsers = async() => {
    const users = await users.findAll({
        attributes : {
            exclude: ["password"]
        }
    })
    return users
}

//Solo administradores
const getUserById = async(id) => {
    const user = await users.findByPk(id)
    return user
}

//clientes y administradores
const deleteUser = async(id) => {
    const user = await users.destroy({
        where: {
            id
        }
    })
    return {
        message: `User with id: ${id} deleted succesfully.`,
        user
    }
}

// cualquier rol
const editUser = (id, data) => {
    const user = await users.update(data,{
        where: {
            id
        }
    })
    return {
        message: `User with id: ${id} eddited succesfully.`,
        user: user
    }
}

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    deleteUser,
    editUser
}
