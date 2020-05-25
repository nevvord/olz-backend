const {Types} = require('mongoose')

module.exports = async (req, res) => {
  let sysMSG = ""
  const publication = await  new db.Publications({
    _id: new Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    prices: [req.body.price],
    characteristics: req.body.characteristics,
    category: req.body.category,
    subCategory: req.body.subCategory,
    user: req.userID
  })

  const user = await db.Users.findOne({_id: req.userID})
  user.publications.unshift(publication._id)

  const category = await db.Category.findOne({_id: req.body.category})
  if (!category) return res.status(404).send({msg: "Категория ненайдена"})
  category.publications.unshift(publication._id)
  
  const subCategory = await db.SubCategory.findOne({_id: req.body.category})
  if (!subCategory) return res.status(404).send({msg: "Подкатегория ненайдена"})
  subCategory.publications.unshift(publication._id)
  
  await user.save().then(() => {
    sysMSG = sysMSG + "Юзер обнавлен. "
  }).catch((err) => {
    return res.status(500).res({msg: "Неудалось обновить поьзователя", err})
  })

  await category.save().then(() => {
    sysMSG = sysMSG + "Категория обновленна. "
  }).catch((err) => {
    return res.status(500).res({msg: "Неудалось обновить категорию", err})
  })

  await subCategory.save().then(() => {
    sysMSG = sysMSG + "Подкатегория обновленна. "
  }).catch((err) => {
    return res.status(500).res({msg: "Неудалось обновить подкатегорию", err})
  })

  await publication.save().then(() => {
    sysMSG = sysMSG + "Публикация добавленна."
    return res.send({msg: "Публикация добавленна", publication, sysMSG})
  }).catch((err) => {
    return res.status(500).res({msg: "Неудалось добавить публикацию", err})
  })
}