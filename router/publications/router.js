const router = express.Router()
const middleware = require('../../middleware')

const controllers = require('./controllers')


router
  .get('/categories/get/forMainPage', controllers.getCategoriesForMainPage)
  .use(middleware.verify.Deafault)
  .post('/add/publication', controllers.addPublication)
  .post('/add/images', middleware.Multer.array('images', 20), controllers.addPublicationImages)
  .get('/categories/get/forAddPublications', controllers.getCategoriesForAddPublications)

module.exports = router