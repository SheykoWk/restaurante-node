const crypto = require('../utils/crypto');
const uuid = require('uuid');
const sequelize = require('../models/index').sequelize;
const initModels = require('../database/models/init-models');

const models = initModels(sequelize)


//Cualquier usuario
const registerUser = (data) => {
    // todo: La contraseña tiene que estar encriptada con bcrypt
    const hashedPassword = crypto.hashPassword(data.password);
    const userId = uuid.v4();
    const newUser = models.users.create({
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
    const users = await models.users.findAll({
        attributes : {
            exclude: ["password"]
        }
    })
    return users
}

//Solo administradores
const getUserById = async(id) => {
    const user = await models.users.findByPk(id)
    return user
}

//clientes y administradores
const deleteUser = async(id) => {
    const user = await models.users.destroy({
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
    const user = await models.users.update(data,{
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
