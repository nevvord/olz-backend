const   express         =   require('express')
const   db              =   require('./db/index')()
const   cors            =   require('cors')
const   multer          =   require('./plugins/multer')

//==== Middleware =====
const   verifyToken     =   require('./middleware/veryify')
//===== Glogal CFG =====
global.db       = db
global.express  = express
global.multer   = multer

//===== Config sets =====
const { ServerConfig } = require('./config/')

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
// app.use(cookieparser())

//===== Routes =====
const auth = require('./router/auth')
const users = require('./router/users')

app.get('/', (req, res)=> {
    res.send("OLZ API! Welcome!")
})
app.use('/auth', auth.router)
app.use('/user', users.router)

//==== Listen Requests =====
app.listen(ServerConfig.port, () => console.log(`Server has been running in ${ServerConfig.host}:${ServerConfig.port}`))