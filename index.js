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
// const api = require('./router/api')
// const store = require('./router/store')
// const crm = require('./router/crm')

// app.get('/', (req, res) => {
//     res.send({
//         api: "worked"
//     })
// })
app.use('/auth', auth.router)
app.get('/', verifyToken ,(req, res)=> {
    res.send("api worked")
})
// app.use('/api', verifyToken , api.router)
// app.use('/store', verifyToken , store.router)
// app.use('/crm' , crm.router)

//==== Listen Requests =====
app.listen(ServerConfig.port, () => console.log(`Server has been running in ${ServerConfig.host}:${ServerConfig.port}`))