const router = express.Router()

// const authentication = require('./controllers/authentication')
const login = require('./controllers/login')
// const logout = require('./controllers/logout')
const registration = require('./controllers/registration')
const facebook = require('./controllers/fb')

router
    // .post('/authentication', authentication)
    .post('/login', login)
    .post('/fb', facebook)
    // .post('/logout', logout)
    .post('/registration', registration)

module.exports = router