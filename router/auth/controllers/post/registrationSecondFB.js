module.exports = async (req, res) => {
  const { email, name, fbID } = req.body
  const fbToken = req.headers.authorization.split(' ')[1]
  const user = await db.Users.findOne({email})
  if (!user) return res.status(404).send({msg: "Новый пользователь. Нужен пароль"})
  if (user.fbID !== fbID) user.fbID = fbToken
  user.save().then((result) => {
    res.send({user, msg: `Добро пожаловать ${name}`, user: result})
  }).catch((err) => {
    res.status(500).send({msg: "Неудалось сохранить пользователя"}), err
  })
}
