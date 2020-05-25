const router = express.Router()
const middleware = require('../../middleware')

const putStatus = require('./controllers/profile/put/status')
const putAvatar = require('./controllers/profile/put/avatar')
const putInfo = require('./controllers/profile/put/info')
const getDeafaultAvatars = require('./controllers/getDefaultAvatrs')
const getUserWithId = require('./controllers/profile/get/user')

router
    .get('/profile/get/:id', getUserWithId)
    .use(middleware.verify.Deafault)
    .put('/profile/change/status', putStatus)
    .put('/profile/change/info', putInfo)
    .put('/profile/change/avatar', middleware.Multer.single('image'), putAvatar)
    .get('/get/defaultavatars', getDeafaultAvatars)


module.exports = router