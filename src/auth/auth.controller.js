const { generateToken } = require("../tools/generateToken")
const verify_tokens = require('../database/models/init-models').initModels().verify_tokens


const createToken = async (userId) => {
    const newToken =await verify_tokens.create({
        token: generateToken(),
        user_id: userId,
        used: false
    })
    return newToken
}


module.exports = {
    createToken
}

