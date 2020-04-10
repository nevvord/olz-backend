const router = express.Router()
const verify = require('../../middleware/veryify')

const putStatus = require('./controllers/putStatus')

router
    .put('/change/status', verify, putStatus)

module.exports = router