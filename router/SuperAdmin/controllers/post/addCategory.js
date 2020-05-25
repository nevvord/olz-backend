const {Types} = require('mongoose')
module.exports = async (req, res) => {
  const {titleEn, titleRu, titleUa, subCategories, _id} = req.body.category
  const category = new db.Categories({
    titleEn, titleRu, titleUa, subCategories,
    _id: Types.ObjectId(_id)
  })

  category.save().then(result => {
    res.send({
      msg: "Категория успешно созданна", 
      category: result
    })
  }).catch(error => {
    res.status(500).send({
      msg: "Ошибка сервера. Неудалось создать категорию", 
      error
    })
  })
}