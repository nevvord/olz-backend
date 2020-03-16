const router = express.Router()
const middleware = require('../../middleware/veryify')
// const authentication = require('./controllers/authentication')
const user = require('./controllers/user')
const login = require('./controllers/login')
// const logout = require('./controllers/logout')
const registration = require('./controllers/registration')
const facebook = require('./controllers/fb')

router
    .get('/user', middleware, user)
    // .post('/authentication', authentication)
    .post('/login', login)
    .post('/fb', facebook)
    // .post('/logout', logout)
    .post('/registration', registration)

module.exports = router