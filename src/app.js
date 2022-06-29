//? Dependencies
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('swagger-ui-express')
//? Import files
const config = require('./config')
const userRouter = require('./users/users.routes').router
const swaggerJson = require('./swagger.json')

//? Initial configuration
const app = express()

// Enable incoming JSON data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

if(config.nodeEnv === 'development'){
    app.use(morgan("dev"))
}else {
    app.use(morgan("combined"))
}

//* Routes
app.use("/api/v1/users", userRouter)
//app.use("/api/v1/auth")

app.use("/docs", swagger.serve, swagger.setup(swaggerJson))

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
}