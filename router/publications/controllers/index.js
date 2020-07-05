const getCategoriesForAddPublications = require('./get/getCategoriesForAddPublications')
const getCategoriesForMainPage = require('./get/getCategoriesForMainPage')
const addPublication = require('./post/addPublicaton')
const addPublicationImages = require('./post/addPublicationImages')
module.exports = {
  getCategoriesForAddPublications,
  getCategoriesForMainPage, 
  addPublicationImages,
  addPublication,
  getUserPublications: require('./get/getUserPublications'),
  getOnePublication: require('./get/getOnePublication')
}