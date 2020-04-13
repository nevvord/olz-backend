const router = express.Router()
const verify = require('../../middleware/veryify')
// const authentication = require('./controllers/authentication')
const user = require('./controllers/user')
const login = require('./controllers/login')
// const logout = require('./controllers/logout')
const registration = require('./controllers/registration')
const registrationFB = require('./controllers/registrationFB')
const facebook = require('./controllers/fb')
const verifymail = require('./controllers/verifymail')


router
    .get('/user', verify, user)
    .post('/verifymail', verifymail)
    // .post('/authentication', authentication)
    .post('/login', login)
    .post('/fb', facebook)
    // .post('/logout', logout)
    .post('/registration', registration)
    .post('/registrationFB', registrationFB)

module.exports = router