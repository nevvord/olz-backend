module.exports = (req, res) => {
  db.Categories.find({}).populate('subCategories').then(categories => {    
    res.send({msg: "Категории успешно найдены", categories}) 
  }).catch(error => {
    res.status(500).send({msg: "Категории не найдены", error})
  });
}