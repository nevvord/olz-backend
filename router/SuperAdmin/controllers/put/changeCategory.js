module.exports = async (req, res) => {
  const {titleEn, titleRu, titleUa, subCategories} = req.body.category
  const _id = req.params.id
  const category = await db.Categories.findOne({_id})
  
  category.titleEn = titleEn
  category.titleRu = titleRu
  category.titleUa = titleUa
  category.subCategories = subCategories
  
  category.save().then(result => {
    res.send({
      msg: "Категория успешно созданна", 
      category: result
    })
  }).catch(error => {
    res.status(500).send({
      msg: "Ошибка сервера. Неудалось создать категорию", 
      err
    })
  })
}