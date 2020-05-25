const {Types} = require('mongoose')
module.exports = async (req, res) => {
  const {titleEn, titleRu, titleUa, category, characteristics, _id} = req.body.subCategory
  const subCategory = new db.SubCategories({
    titleEn, titleRu, titleUa, category, characteristics,
    _id: Types.ObjectId(_id)
  })
  await subCategory.save().then(result => {
    res.send({
      msg: "Категория успешно созданна", 
      subCategory: result
    })
  }).catch(err => {
    res.status(500).send({
      msg: "Ошибка сервера. Неудалось создать категорию", 
      err
    })
  })
}