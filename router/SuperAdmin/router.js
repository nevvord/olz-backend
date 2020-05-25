const middleware = require('../../middleware')
const router = express.Router()

const controllers = require('./controllers')

router
  .use(middleware.verify.SuperAdmin)
  .post('/category/add', controllers.addCategory)
  .post('/subcategory/add', controllers.addSubCategory)
  .put('/category/change/:id', controllers.changeCategory)
  .put('/subCategory/change/:id', controllers.changeSubCategory)

module.exports = router