const router = express.Router()
const middleware = require('../../middleware/')
const user = require('./controllers/get/user')
const login = require('./controllers/post/login')
const registration = require('./controllers/post/registration')
const registrationFB = require('./controllers/post/registrationFirstFB')
const facebook = require('./controllers/post/registrationSecondFB')
const verifymail = require('./controllers/post/verifymail')


router
    .get('/user', middleware.verify.Deafault, user)
    .post('/verifymail', verifymail)
    .post('/login', login)
    .post('/fb', facebook)
    .post('/registration', registration)
    .post('/registrationFB', registrationFB)

module.exports = router