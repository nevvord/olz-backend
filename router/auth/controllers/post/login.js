const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res) => {
  const email = req.body.email.toString()
  const password = req.body.password.toString()
  
  const user = await db.Users.findOne({email})
  if (!user) return res.status(404).send({msg: "Пользователя с данным почтовым адресом не сушествует"})
  const passwordMatch = bcrypt.compare(password, user.password)
  if (!passwordMatch) return res.status(401).send({msg: "Вы ввели неверный пароль. Попробуйте еще раз!"})
  const bodyToken = {_id: user._id}
  const token = jwt.sign(bodyToken, process.env.JWT_KEY)
  if (!token) return res.status(500).send({msg: "Неудалось сгенерировать токен"})
  res.send({msg: `Добро пожаловать ${user.name}`, token})
}