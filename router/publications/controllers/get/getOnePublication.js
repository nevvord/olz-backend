module.exports = async (req, res) => {
  const _id = req.params.id
  const publication = await db.Publications.findOne({_id, confirmed: true}).populate(['images', 'category', 'subCategory', 'user'])
  if (!publication) return res.status(404).send({msg: "Публикация не найдена"})
  res.send({msg: "Публикация найдена", publication})
}