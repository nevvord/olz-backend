const bcryptjs = require('bcryptjs')
const uuid = require('uuid')
const sender = require('../../../../plugins/sendEmail')

module.exports = async (req, res) => {
  const { email, password, name } = req.body
  const user = await db.Users.findOne({email})
  if (user) return res.status(401).send({msg: `Здравствуйте ${user.name}. Это вы? Вы уже зарегестрированны. Попробуйте авторезироватся!`})  
  const UnUser = await db.UnUsers.findOne({email})
  if (UnUser) return res.status(401).send({msg: `Здравствуйте ${user.name}. Это вы? Вам было отправленно письмо на почту. Проверте!`})  
  const solt = await bcryptjs.genSalt(10)
  if (!solt) return res.status(500).send({msg: 'Ошибка сервера. Возможно кодер x_x', error})
  const hash = await bcryptjs.hash(password, salt)
  if (!hash) return res.status(500).send({msg: 'Ошибка сервера. Возможно кодер x_x(', error})
  const keyForVerify = uuid.v1()
  const link = `http://localhost:3000/verify/${keyForVerify}`  
  const newUser = await new db.UnUsers({...req.body, password: hash, key: keyForVerify})
  newUser.save()
  sender(email, link).then(response => {
    console.log("Response: ", response)
  }).catch(error => {
    console.error(error)
  })
  res.send({ msg: `Рады вас видеть ${name}, проверьти почту для верефикации!`})
}