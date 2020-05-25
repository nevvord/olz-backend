const   express         =   require('express')
const   db              =   require('./db/index')()
const   cors            =   require('cors')
const   multer          =   require('./middleware/FilePlugins/Multer')

//===== Glogal CFG =====
global.db       = db
global.express  = express

//===== Configs =====
require('dotenv').config()

//===== Set up express APP =====
const app = express()

//===== APP USE =====
app.use(express.static('static'))
app.use(express.static('uploads'))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}))

//===== Routes =====
const auth = require('./router/auth')
const users = require('./router/users')
const publication = require('./router/publications')
const superAdmin = require('./router/SuperAdmin')


app.get('/', (req, res)=> {
    res.send("OLZ API! Welcome!")
})
app.use('/sa/', superAdmin.router)
app.use('/auth', auth.router)
app.use('/user', users.router)
app.use('/publications', publication.router)

//==== Listen Requests =====
app.listen(process.env.SERVER_PORT, () => console.log(`Server has been running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`))