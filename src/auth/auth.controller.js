const { generateToken } = require("../tools/generateToken")
const verify_tokens = require('../database/models/init-models').initModels().verify_tokens
const userControllers = require('../users/users.controllers');
const crypto = require('../tools/crypt');
const { toPromise } = require('../tools/toPromise');

const createToken = async (userId) => {
    const newToken =await verify_tokens.create({
        token: generateToken(),
        user_id: userId,
        used: false
    })
    return newToken
}



const checkUsersCredential = async (email, password) => {
    const [user, err] = await toPromise(userControllers.getUserByEmail(email));
    if (!err && user.dataValues) {
        console.log(user)
        return crypto.comparePassword(password, user.password);
    } else {
        return null;
    }
};

module.exports = {
    checkUsersCredential,
    createToken

};

module.exports = {
}

