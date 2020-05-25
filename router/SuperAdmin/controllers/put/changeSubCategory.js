module.exports = async (req, res) => {
  const {titleEn, titleRu, titleUa, characteristics} = req.body.subCategory
  const _id = req.params.id
  
  const subCategory = await db.SubCategories.findOne({_id})
  
  subCategory.titleEn = titleEn
  subCategory.titleRu = titleRu
  subCategory.titleUa = titleUa
  subCategory.characteristics = characteristics
  
  subCategory.save().then(result => {
    res.send({
      msg: "Категория успешно созданна", 
      subCategory: result
    })
  }).catch(error => {
    res.status(500).send({
      msg: "Ошибка сервера. Неудалось создать категорию", 
      err
    })
  })
}