const router = express.Router()

const oneUser = require('./controllers/fb')

router
    .post('/registration', registration)

module.exports = router