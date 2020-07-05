module.exports= async (req, res) => {
  const publications = await db.Publications.find({user: req.userID, confirmed: true}).populate(['user', 'images']).limit(4).sort({date: -1})
  if (!publications) return res.status(404).send({msg: "Пкбликации ненайдены"})
  res.send({msg: "Публикации найдены", publications})
}