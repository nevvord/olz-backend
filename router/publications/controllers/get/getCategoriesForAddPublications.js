module.exports = async (req, res) => {
  const categories = await db.Categories.find().poulate('subCategories')
  if (!categories) res.status(500).send({msg: "Категории не найдены"})
  console.log('getCat');
  
  res.send({msg: "Категории успешно найдены", categories}) 
}