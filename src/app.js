//? Dependencies
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('swagger-ui-express')
const multer = require('multer')
//? Import files
const config = require('./config')
const userRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.router').router
const swaggerJson = require('./swagger.json')
const { transporter } = require('./tools/email')

//? Initial configuration
const app = express()

// Enable incoming JSON data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage})


if(config.nodeEnv === 'development'){
    app.use(morgan("dev"))
}else {
    app.use(morgan("combined"))
}

//* Routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)

app.use("/docs", swagger.serve, swagger.setup(swaggerJson))

app.get('/email', (req, res) => {

    const welcomeEmail = (userName, email) => {
        return ({
            subject: 'Este es mi hola mundo',
            html: `Hello world <h1>hola ${userName}</h1> <img width='200px' src='https://i.imgur.com/f33c3x9.jpeg'>`,
            to: email,
            from: "test.academlo.com"
        })
    }

    transporter.sendMail(welcomeEmail("sahid", "sheyko.wk@gmail.com"))
    res.status(200).json({message: 'Email sent'})
})

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(201).send(req.file)
    } catch (error) {
        res.status(400).json({message: 'error'})
    }
})

app.get('/files/:name', (req, res) => {
    res.sendFile(__dirname + `/uploads/${req.params.name}`)
})


app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
}