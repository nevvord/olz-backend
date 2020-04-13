const router = express.Router()
const verify = require('../../middleware/veryify')

const putStatus = require('./controllers/putStatus')
const getDeafaultAvatars = require('./controllers/getDefaultAvatrs')

router
    .put('/change/status', verify, putStatus)
    .get('/get/defaultavatars', verify, getDeafaultAvatars)


module.exports = router