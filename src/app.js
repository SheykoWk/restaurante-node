//? Dependencies
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
//? Import files
const config = require('./config')

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
app.use("/api/v1/users")
app.use("/api/v1/auth")

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
}